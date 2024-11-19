<script lang="ts">
    import Renderpage from "$lib/renderpage.svelte";
    let test_json_str = `{
"title": "Ettl did great on the frisbee tournament",
"author": "Jammy",
"date": "11/19/24",
"content": "Ettl is excellent! Ettl excels! Ettl wins awards en masse! Ettl is the Everwin!"}`;
</script>
<Renderpage page={test_json_str}/>