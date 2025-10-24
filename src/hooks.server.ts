/** biome-ignore-all lint/suspicious/noExplicitAny: idgaf*/
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { env } from '$env/dynamic/private';
import { sequence } from '@sveltejs/kit/hooks';
import { createOrUpdateMember, getMemberByEmail } from '$lib/firebase';

const authHandle = SvelteKitAuth({
	providers: [
		Google({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: { hd: 'prismsus.org' }
			},
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture
				} as {
					id: string;
					name?: string | null;
					email?: string | null;
					image?: string | null;
				};
			}
		})
	],
	secret: env.AUTH_SECRET,
	trustHost: true,
	callbacks: {
		async jwt({ token, user, profile }) {
			const picture = (user as any)?.image || (profile as any)?.picture;
			if (picture) token.picture = picture as string;
			return token;
		},
		async session({ session, token }) {
			if (session.user && token.picture) {
				session.user.image = token.picture as string;
			}
			return session;
		},
		async signIn({ user }) {
			// When user signs in, check if they exist in members collection
			if (user.email) {
				try {
					const existingMember = await getMemberByEmail(user.email);

					// If member doesn't exist, create a placeholder entry
					if (!existingMember) {
						await createOrUpdateMember(user.email, {
							name: '', // Will be set during onboarding
							house: '', // Will be set during onboarding
							role: 'student'
						});
						console.log('Created new member entry for:', user.email);
					}
				} catch (error) {
					console.error('Error checking/creating member:', error);
					// Don't block sign in if there's an error
				}
			}
			return true;
		}
	}
});

export const { handle } = authHandle;
