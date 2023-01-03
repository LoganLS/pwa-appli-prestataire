<script setup lang="ts">
import { onMounted, ref } from 'vue'
import '@fullcalendar/core/vdom'
import FullCalendar from "@fullcalendar/vue3"
import dayGridPlugin from '@fullcalendar/daygrid'
import { getRdvs, RDV, refreshRdv } from '@/services/rdv'

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

function registerNotification() {
    Notification.requestPermission(permission => {
    if (permission === 'granted') {
      registerBackgroundSync();
    } else console.error('Il faut les permissions pour recevoir les notifications');
  })
}

function registerBackgroundSync() {
  if (!navigator.serviceWorker) {
    return console.error('Service Worker not supported');
  }

  navigator.serviceWorker.ready
    .then(registration => {
        registration.addEventListener('sync', function(event) {
          console.log('sync event')
          console.log(event)
          if (event.tag === 'syncNotif') {
              event.waitUntil(syncRdv()); // on lance la requête de synchronisation
          }
        });
    })
    .then(() => console.log('Registered background sync'))
    .catch(err => console.error('Error registering background sync', err));
}

function syncRdv() {
  console.log('refresh rdvs')
    return getRdvs()
    .then((response) => {
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          // signaler et envoyer au client les nouvelles données
          client.postMessage(response);
        });
      });
      return response // résout la promesse avec les nouvelles données
    })
    .then(rdvs => {
        console.log(rdvs)
        self.registration.showNotification(
            `${rdvs.length} attendees to the PWA Workshop`
        )
    });
}
</script>

<template>
  <section class="mt-5">
    <VBtn @click="registerNotification()">
      Recevoir les notifications
    </VBtn>
    <FullCalendar :options="calendarOptions" />
  </section>
</template>