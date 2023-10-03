<template>
  <div class="text-center">

    <h1 class="border border-3 border-dark fw-bold bg-dark text-warning m-2"> My Event Tickets </h1>
  </div>
  <section class="">

    <div v-for="t in tickets" :key="t.id">
      <myTicketsCard :ticketholder="t" />
    </div>


  </section>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

import { onMounted } from 'vue'
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js';

export default {
  setup() {
    async function getMyTicketsFromApi() {
      try {
        await ticketsService.getMyTicketsFromApi()
      } catch (error) {
        Pop.error(error, '[AccountPage: getMyTicketsFromApi()]')
        logger.log(error)
      }
    }
    onMounted(() => {
      getMyTicketsFromApi()
    })



    return {
      ticket: computed(() => AppState.tickets),
      tickets: computed(() => AppState.myTickets),
      account: computed(() => AppState.account)
    }
  }
}
</script>
