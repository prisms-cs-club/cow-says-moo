<script lang="ts">
    import type { DataType } from './+page.ts';
    export let data: DataType;
</script>

<!-- Put your event template code here! -->
<!-- note: use `data.eventObj` to access the details of the event -->
<h1>{data.eventBody.title}</h1>