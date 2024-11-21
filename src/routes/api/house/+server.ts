const house = [{name: "ettl", description: "asdf"}, {name: "haha", description: "haha"}];

export async function GET({ url }) {
    const id = url.searchParams.get('id');
    return new Response(JSON.stringify(house.find(h => h.name === id)), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}