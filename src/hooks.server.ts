import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/core/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [Google({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    authorization: 'https://accounts.google.com/o/oauth2/auth?response_type=code&hd=prismsus.org',
  })],
  secret: AUTH_SECRET,
  trustHost: true,
});
