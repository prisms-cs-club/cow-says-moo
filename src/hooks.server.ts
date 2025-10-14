/** biome-ignore-all lint/suspicious/noExplicitAny: idgaf*/
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Google({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
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
	secret: AUTH_SECRET,
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
