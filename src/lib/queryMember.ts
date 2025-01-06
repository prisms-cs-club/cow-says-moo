import type { Member } from "./format";
import { page } from '$app/state';

/*
returns either a member, or undefined.
*/
export async function getMember(): Promise<Member | undefined> {
    if(page.data.session && page.data.session.user) {
        let member: Member | undefined = await (await fetch("/api/member?email=" + page.data.session.user.email)).json();
        return member;
    }
    return undefined;
}