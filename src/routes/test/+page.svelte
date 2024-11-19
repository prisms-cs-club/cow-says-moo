<script lang="ts">
    import Renderpage from "$lib/renderpage.svelte";
    let test_json_str = `{
"title": "Ettl did great on the frisbee tournament",
"author": "Jammy",
"date": "11/19/24",
"content": "Ettl is excellent! Ettl excels! 稍有常识的人都能看出，如果我们的队伍继续前行，那些小小的困难还能阻挡的了我们吗?"}`;
</script>
<Renderpage page={test_json_str}/>