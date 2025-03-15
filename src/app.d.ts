// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface PageState {}
		// interface Platform {}

		interface Locals {
			session: import('@auth/core').Session | null
		  }
		  interface PageData {
			session: import('@auth/core').Session | null
		  }
	}
}

export {};
