<template class="">
    <div class="container-fluid hero-img">
        <section v-if="activeEvent?.id" class="row justify-content-center">
            <div
                class="card col-4 home-card border border-2 border-warning text-center p-2 rounded-bottom text-white fw-bold bgGreen text-center">


                <div v-if="!activeEvent.isCanceled && activeEvent.capacity - activeEvent.ticketCount > 0">
                    <img class="eventImg img-fluid border rounded-top border-2 border-dark" :src="activeEvent.coverImg"
                        alt='broke' />

                </div>
                <div v-else class="bgRed eventImg text-center image-fluid border border-warning border-5">
                    <img class="" alt="logo" src="../assets/img/giphy_(2).gif" height="35" />
                    <h3 class="fw-bold text-dark text-decoration-underline">CANCELED</h3>
                </div>

                <div v-if="!activeEvent.isCanceled" class=" text-center d-flex flex-column d-inline-flex ">
                    <h3 class="border border-4 border-dark bg-dark text-light"><span
                            class="text-warning m-2">Event:</span>{{
                                activeEvent?.name }}</h3>
                    <h3 class="border border-4 border-dark bg-dark text-light"><span
                            class="text-warning m-2">Location:</span> {{
                                activeEvent.location }}</h3>
                    <h3 class="border border-4 border-dark bg-dark text-light"><span class="text-warning m-2">Start
                            Date:</span>{{
                                activeEvent.startDate }}</h3>

                    <div></div>


                    <h3 class="border border-4 border-dark bg-dark text-light"><span class="text-warning m-2">Start
                            Spots Left:</span>{{ activeEvent.capacity - ticketCount }}</h3>
                    <!-- <div v-if="!hasTicket">
                        <h3 class="border border-1 border-dark bg-dark text-warning m-2">spots left: <span
                                class="text-danger">
                                {{
                                    activeEvent.capacity
                                }}</span> </h3>
                    </div>
                    <div v-else>
                        <h3 class="border border-1 border-dark bg-dark text-warning m-2">spots left: <span
                                class="text-danger">
                                {{
                                    activeEvent.capacity - 1
                                }}</span> </h3>
                    </div> -->
                </div>

                <div v-else>
                    <h1 class="text-warning border border-3 border-danger bg-black">Event Has Been Canceled</h1>
                </div>

                <div v-if="!activeEvent.isCanceled" class="col-8s ">
                    <p class="border border-1 m-1 border-dark bgBlue rounded elevation-5 text-dark">{{
                        activeEvent.description }}

                    </p>


                </div>

                <div v-if="!activeEvent.isCanceled" class="d-inline-flex justify-content-evenly m-2">

                    <button class="btn btn-warning border border-2 border-warning elevation-5 text-dark fw-bold"
                        @click="getEventTicket()" v-if="!hasTicket">
                        Attend Event
                    </button>

                    <button @click="deleteThisTicket()" v-else class="btn btn-danger">
                        Delete Ticket
                    </button>


                </div>

                <div class="col-6">
                </div>
                <div class="col-6 text-center offset-2">
                    <img class="profile-pic border border-3 border-warning" :src="activeEvent.creator.picture" alt="">
                    <h1>{{ activeEvent.creator.name }}</h1>
                </div>
                <div v-if="!activeEvent.isCanceled">

                    <button v-if="activeEvent.creatorId == account?.id" @click="cancelEvent()" class="btn btn-danger">Cancel
                        Event
                        <i class="mdi mdi-delete-forever"></i></button>
                </div>
            </div>


        </section>
        <section v-else>
            <i class="mdi mdi-loading mdi-spin text-primary fs-2">loading</i>
        </section>

        <section>

            <CommentForm />

        </section>

        <section class="container">


            <div class="d-flex justify-content-center">
                <div class="col-2 border border-3 border-dark elevation-5 rounded bgBlue">
                    <div
                        class="text-center border border-2 border-dark bg-dark fw-bold text-warning text-decoration-underline">
                        ATTENDEES</div>
                    <div v-for=" t  in  ticket " :key="t.id">
                        <TicketholderCard :ticketholder="t" />
                    </div>
                </div>
                <div class="col-8">
                    <div v-for="  c   in   comments  " :key="c.id">
                        <commentCard :comment="c" />
                    </div>

                </div>

            </div>

        </section>
    </div>
</template>

//FIXME ^^^^^^^^^^
//NOTE - Need to figure out how to bring the id of the ticket the i have on the user
//TODO - Fix the delete ticket button. Fix the cancel event button. fix the comment button

//TODO - Need to figure out the problems with what im sending through for my delete request
//REVIEW - Need to focus on this page, it has most of the required goals for the application,
//REVIEW - also need to go through and get rid of any code you are not using any more
//TODO - figure out why the AppState.some only works until there is a change in the data from user modification.
//TODO - There is a lot of code on this one page, once functionality is 100% break up cod into more components
//FIXME - vvvvvvvvv
<script>


import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { computed, onMounted, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { ticketsService } from '../services/TicketsService.js';
import { commentsService } from '../services/CommentsService.js';
import commentCard from '../components/CommentCard.vue'
export default {
    components: { commentCard },
    setup() {
        const route = useRoute();




        onMounted(() => {
            getEventById()
            getComments()

            getTicketsByEventId()
        })
        async function getEventById() {
            try {
                console.log('am I running');
                const eventId = route.params.eventId
                await eventsService.getEventById(eventId)
                eventId == AppState.activeEvent
            } catch (error) {
                Pop.error(error)
            }
        }


        async function getEventTicket() {
            try {
                const eventId = route.params.eventId;
                const ticket = await ticketsService.getEventTicket(eventId);

                logger.log('Current activeEvent:', AppState.activeEvent);
                // Check if the ticket was successfully obtained
                // if (ticket) {
                //     // Subtract 1 from the event's capacity
                //     if (AppState.activeEvent) {
                //         AppState.activeEvent.capacity -= 1;
                //     }
                // }
            } catch (error) {
                Pop.error(error);
            }
        }




        async function cancelEvent() {
            try {
                const eventId = route.params.eventId
                await eventsService.cancelEvent(eventId);

                AppState.activeEvent.isCanceled = true;

            } catch (error) {
                logger.error(error);
                Pop.error(error.message);
            }
        }
        async function getTicketsByEventId() {
            try {
                const ticketId = route.params.eventId
                await ticketsService.getTicketsByEventId(ticketId)
            } catch (error) {
                Pop.error
            }
        }


        async function getComments() {
            try {
                const commentId = route.params.eventId
                await commentsService.getComments(commentId)
                logger.log("are you there comments?")
            } catch (error) {
                Pop.error
            }
        }

        async function deleteThisTicket() {
            try {
                const ticket = AppState?.tickets.find(t => t.accountId === AppState?.user.id);
                await ticketsService.deleteThisTicket(ticket.id)
            } catch (error) {
                Pop.error(error, '[UserTicket: deleteThisTicket()]')
                logger.log(error)
            }
        }

        return {
            getEventById,
            getEventTicket,
            getComments,
            cancelEvent,

            deleteThisTicket,

            ticketCount: computed(() => AppState?.tickets?.length),
            tickets: computed(() => AppState.myTickets),
            comments: computed(() => AppState.comments),
            activeEvent: computed(() => AppState.activeEvent),
            user: computed(() => AppState.user),
            account: computed(() => AppState.account),
            ticket: computed(() => AppState.tickets),
            event: computed(() => AppState.events),
            hasTicket: computed(() => {
                const tickets = AppState?.tickets;

                if (Array.isArray(tickets)) {
                    return !!tickets.some(t => t.accountId === AppState?.user.id);
                }

                return false;
            })




        }
    }
}

</script>
<style lang="scss">
.bgGreen {
    background-color: #201b09e9
}

.bgBlue {
    background-color: rgba(151, 212, 210, 0.712);
}

.hero-img {

    background-image: url('https://images.unsplash.com/photo-1465533403411-0af6ede250dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

    background-repeat: repeat;
    object-fit: cover;

}

.canceled-img {
    height: 30vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.bgRed {
    background-color: rgba(238, 8, 8, 0.694);
}

.profile-pic {
    height: 100px;
    width: 100px;
    border-radius: 70%;

    object-fit: cover;
    object-position: center;
}


.home-card {
    width: 50vw;

}

eventImg {
    height: 200px;
    max-width: 200px;
    width: 100%;
    object-fit: contain;
    object-position: center;

}
</style>
  