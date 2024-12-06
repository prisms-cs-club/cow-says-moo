
<script lang="ts">
    import type { PrismsEvent } from "$lib/format.d.ts"
    import daygridPlugin from '@fullcalendar/daygrid';
    import FullCalendar, { Draggable }from 'svelte-fullcalendar';
    import interactionPlugin from '@fullcalendar/interaction';
    export let events: PrismsEvent[] = [
      {
        title: 'Meeting',
        dateStart: '2022-09-12',
        dateEnd: '2022-09-12',
        description: 'sonfgiuehjsroiuhufg',
        tier: 2,
        result: null,
        winner: null
      }
    ];
    let calenderEvents = []; 
    for (let i = 0; i < events.length; i++) {
      calenderEvents.push({title: events[i].title, date: events[i].dateStart});
    }
    let options = {
      events: calenderEvents,
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


