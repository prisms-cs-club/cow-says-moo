import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/core/providers/google";

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [Google({
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorization: 'https://accounts.google.com/o/oauth2/auth?response_type=code&hd=prismsus.org',
  })],
  // You can customize other options here, for example:
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
