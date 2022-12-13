<script setup lang="ts">
import { onMounted, ref } from 'vue'
import '@fullcalendar/core/vdom'
import FullCalendar from "@fullcalendar/vue3"
import dayGridPlugin from '@fullcalendar/daygrid'
import { getRdvs, RDV } from '@/services/rdv';

interface event {
  title: string,
  date: string,
}

const events = ref<Array<event>>([])

onMounted(async () => {
  const rdvs = await getRdvs()
  events.value = rdvs.map((rdv: RDV) => {
    return {
      title: rdv.description,
      date: rdv.date,
    }
  })
})

const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  locale: 'fr',
  firstDay: 1,
  events: events,
})
</script>

<template>
  <section class="mt-5">
    <FullCalendar :options="calendarOptions" />
  </section>
</template>