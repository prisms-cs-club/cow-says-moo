/** biome-ignore-all lint/suspicious/noExplicitAny: idgaf*/
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { env } from '$env/dynamic/private';
import { sequence } from '@sveltejs/kit/hooks';

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
		}
	}
});

export const { handle } = authHandle;
