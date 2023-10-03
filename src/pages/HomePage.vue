<template>
  <div class="hero-img">
    <section class="row justify-content-center">
      <div class="col-12">
        <div class="d-flex justify-content-around my-3 bgGreen rounded p-3 ">

          <button @click="filterBy = ''" class="text-dark fw-bold btn btn-outline-warning bgBlue w-25 mx-2">All</button>
          <button @click="filterBy = 'sport'"
            class="text-dark fw-bold btn btn-outline-warning bgBlue w-25 mx-2">sport</button>
          <button @click="filterBy = 'concert'" class="text-dark fw-bold btn btn-outline-warning bgBlue w-25 mx-2">
            concert
          </button>
          <button @click="filterBy = 'convention'"
            class="text-dark fw-bold btn btn-outline-warning bgBlue w-25 mx-2">convention</button>
          <button @click="filterBy = 'digital'"
            class="text-dark fw-bold btn btn-outline-warning bgBlue w-25 mx-2">Misc</button>
        </div>
      </div>
    </section>

    <button v-if="user.isAuthenticated" class="btn btn-outline-warning bgBlue fw-bold text-dark" data-bs-toggle="modal"
      data-bs-target="#createEvent"><i class="mdi mdi-plus"></i> create event</button>

    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="createEvent">
      <div class="modal-dialog">
        <!-- <slot>

            </slot> -->

        <CreateEvent />
      </div>
    </div>
    <section class="row d-flex">
      <div class="col-3 my-3" v-for="e in event" :key="e.id">

        <TowerEventCard :event="e" />
      </div>
    </section>
  </div>
</template>

<script>

import { onMounted } from 'vue'
import { logger } from '../utils/Logger.js'
import { eventsService } from '../services/EventsService.js'
import { computed, ref } from 'vue'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { ticketsService } from '../services/TicketsService.js'



export default {
  setup() {
    const filterBy = ref('')
    onMounted(() => {
      getEvents();

    })

    async function getEvents() {
      try {
        logger.log('getting Events')
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error.message)
        logger.log(error)
      }
    }
    // async function getTicket(ticketId) {
    //   try {
    //     logger.log('lets get tickets!')
    //     await ticketsService.getTicket(ticketId)
    //   } catch (error) {
    //     Pop.error(error.message)
    //   }
    // }

    return {
      filterBy,
      event: computed(() => {
        // NOTE computeds can be multi-line but then need explicit returns
        if (!filterBy.value) {
          return AppState.events
        } else {
          return AppState.events.filter(event => event.type == filterBy.value)
        }
      }),
      user: computed(() => AppState.user),


    }
  }
}
</script>

<style scoped lang="scss">
.hero-img {

  background-image: url('https://images.unsplash.com/photo-1465533403411-0af6ede250dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

  background-repeat: repeat;
  object-fit: cover;

}

.bgGreen {
  background-color: #7d6c63;
}

.bgBlue {
  background-color: #fbd464
}

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
