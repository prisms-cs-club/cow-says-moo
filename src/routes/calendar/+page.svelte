<!-- Author: Levi Segal -->

<script lang="ts">
    import daygridPlugin from '@fullcalendar/daygrid';
    import FullCalendar, { Draggable }from 'svelte-fullcalendar';
    import interactionPlugin from '@fullcalendar/interaction';
  
    let options = {
    events: [
        { title: 'Computer Science Club', date: '2024-11-05'},
        { title : 'Computer Science Club', date: '2024-11-13'}
        ],
      initialView: 'dayGridMonth',
      schedulerLicenseKey: "XXX",
      plugins: [interactionPlugin, daygridPlugin],
      droppable: true
    };
</script>
<Draggable eventData={{ title: 'Computer Science Club'}}>
  Computer Science Dates
</Draggable>

<FullCalendar {options} />