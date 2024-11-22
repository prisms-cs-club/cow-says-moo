const house = [{ name: "ettl", description: "asdf" }, { name: "haha", description: "haha" }];
const nothing = [{ name: "null", description: "null" }];

export async function GET({ url }) {
    const id = url.searchParams.get('id');
    if (id === null) {
        return new Response(JSON.stringify(nothing), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    return new Response(JSON.stringify(house.find(h => h.name === id)), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}