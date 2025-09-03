import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      // Keep default scopes (openid email profile) and only add domain restriction
      authorization: {
        params: { hd: 'prismsus.org' }
      },
      // Ensure the Google profile maps picture -> image
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
      // Persist picture on the token across requests
      const picture = (user as any)?.image || (profile as any)?.picture;
      if (picture) token.picture = picture as string;
      return token;
    },
    async session({ session, token }) {
      // Expose image on session.user for the client
      if (session.user && token.picture) {
        session.user.image = token.picture as string;
      }
      return session;
    }
  }
});
