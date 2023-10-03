<template class="">
    <div class="border border-dark rounded elevation-5 towerEvent-card">
        <router-link :to="{ name: 'Event Details', params: { eventId: event.id } }">
            <div>
                <img class=" border rounded-top border-2 border-dark" :src="event.coverImg" alt='broke' />

            </div>
            <!-- <div v-else class="bgRed text-center image-fluid border border-warning border-5">
                <img class="" alt="logo" src="../assets/img/giphy_(2).gif" height="35" />
                <h3 class="fw-bold text-dark text-decoration-underline">CANCELED</h3>
            </div> -->

        </router-link>
        <div class="border border-2 border-dark text-center p-2 rounded-bottom text-white fw-bold bgGreen">

            <p>

            <div class="border border-2 border-warning bgBlue rounded elevation-5">
                <div>
                    <span class="text-bold text-dark">Location:</span> {{ event.location }}
                </div>

                <div>
                    <span class="text-bold text-dark">Date:</span> {{ event.startDate }}
                </div>
                <div><span class="text-bold text-dark">Event Name:</span>{{ event.name }}</div>

            </div>
            </p>
            <!-- <div class="d-flex justify-content-evenly" v-if="user.isAuthenticated && !event.isCanceled">
                <button class="btn btn-success btn-sm w-50">
                    Attend Event
                </button>
                <button class="btn btn-warning btn-sm  w-50">
                    comment
                </button>
            </div> -->
            <!-- <div v-if="event.creator.id == account?.id" class="btn btn-danger btn-sm">
                cancel Event
            </div> -->
        </div>
    </div>
</template>

<script>

import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';



export default {
    props: {
        event: { type: event, required: true }
    },


    setup() {







        const canceledImage = '../assets/img/canceled-image.gif';


        computed(() => AppState.events)

        return {
            account: computed(() => AppState.account),
            user: computed(() => AppState.user),
            hasTicket: computed(() => {
                const tickets = AppState?.tickets;

                if (Array.isArray(tickets)) {
                    return !!tickets.some(t => t.accountId === AppState?.user.id);
                }

                return false;
            }),
            canceledImage,


            getUserById(userId) {
                return this.users.find(user => user.id === userId) || {};
            },






        };
    }
};
</script>
    
<style lang="scss">
.bgGreen {
    background-color: #201b09e9
}

.bgBlue {
    background-color: rgba(151, 212, 210, 0.712);
}

.bgRed {
    background-color: rgba(238, 8, 8, 0.694);
}

.canceled-img {
    height: 30vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.towerEvent-card {
    box-shadow: 2px 2px rgba(55, 54, 17, 0.9);
    font-family: monospace;
    font-size: medium;


    img {
        height: 30vh;
        width: 100%;
        object-fit: cover;
        object-position: center;
    }
}
</style>

  
  
  
  
    