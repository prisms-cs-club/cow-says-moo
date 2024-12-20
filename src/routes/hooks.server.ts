import { SvelteKitAuth } from "@auth/sveltekit" 
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "$env/static/private" 
import Google from "@auth/core/providers/google"; 

export const handle = SvelteKitAuth({
  providers: [Google({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET
  })],
  // You can customize other options here, for example:
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
