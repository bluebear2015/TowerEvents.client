<template >
  <div class="hero-img">
    <!-- <div class="about text-center">
    <h1>Tower User:{{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div> -->
    <div class="card bg-newPink ">
      <div class="card-body">
        <div class="profile-card mb-2 text-center">
          <p class="text-center mb-0">
            <img :src="account.picture" alt="account.name"
              class=" border border-3 border-warning rounded-circle account-picture img-fluid">
            <!-- <img :src="account.coverImg" alt="account.name"
            class="border border-3 border-warning cImage img-fluid rounded-circle"> -->
          </p>
        </div>
        <h1 class="border border-bottom border-warning bg-dark text-warning fw-bold border-3 rounded-pill">{{ account.name
        }}</h1>
        <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
          <span class="fs-5 text-bold text-danger ">Bio:</span>
        <h4> {{ account.bio }} </h4>
        </p>
        <!-- FIXME missing github and resume DOUBLE check the readme for this checkpoint, it has a link the account model with everything in it. IT ALL needs to be here. -->

        <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
          <span class="fs-5 text-bold text-danger">Email:</span> <u> {{ account.email }}</u>
        </p>
        <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
          <span class="fs-5 text-bold text-danger">Class:</span> <u> {{ account.class }} late Summer 2023</u>
        </p>
        <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
          <span class="fs-5 text-bold text-danger">Graduated:</span> <u> {{ account.graduated }}</u>
        </p>
        <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
          <span class="fs-5 text-bold text-danger">Github:</span> <u> {{ account.github }}
            http//github.com/bluebear2015</u>
        </p>

        <!-- <li>
       
    <span class="fs-5 text-bold">Alumni:</span>    <u>  {{ account.alumni }} </u>
       </li> -->
      </div>
    </div>



    <div class="ticket" v-for="ticket in tickets" :key="ticket.id">
      <div class="ticket-details border border-secondary bg-light col-6">
        <img class="ticket-cover" :src="ticket.event.coverImg" alt="Event Cover" />
        <h2>{{ ticket.event.name }}</h2>
        <p>Event Description: {{ ticket.event.description }}</p>
        <p>Event Location: {{ ticket.event.location }}</p>
        <p>Event Date: {{ ticket.event.date }}</p>
        <p>Event Capacity: {{ ticket.event.capacity }}</p>
        <p :class="{ 'canceled': ticket.event.isCanceled }">
          Event Status: {{ ticket.event.isCanceled ? 'Canceled' : 'Event is still running' }}
        </p>
      </div>
    </div>

  </div>
</template>


<script>
import { computed, onMounted } from 'vue';

import { AppState } from '../AppState';
import { ticketsService } from '../services/TicketsService.js';
import { logger } from '../utils/Logger.js';

export default {


  setup() {

    async function getAccountTickets() {
      try {

        await ticketsService.getAccountTickets()
      } catch (error) {
        logger.error(error)

      }
    }


    onMounted(() => {
      getAccountTickets()
    }
    )
    return {
      tickets: computed(() => AppState.tickets),
      account: computed(() => AppState.account),
    }
  }
}
</script>

<style scoped>
.ticket {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.ticket-details {
  margin-right: 20px;
}

.ticket-cover {
  width: 200px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
}

.canceled {
  text-decoration: line-through;
  color: red;
}

.hero-img {

  background-image: url('https://images.unsplash.com/photo-1465533403411-0af6ede250dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

  background-repeat: repeat;
  object-fit: cover;

}
</style>
