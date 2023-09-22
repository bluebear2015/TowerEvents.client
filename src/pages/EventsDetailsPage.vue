<template>
    <div class=" hero-img">
        <section v-if="activeEvent?.id" class="row justify-content-center">
            <div
                class="card col-4 home-card border border-2 border-warning text-center p-2 rounded-bottom text-white fw-bold bgGreen text-center">
                <div class=" card">
                    <img class="img-fluid" :src="activeEvent.coverImg" alt="">
                </div>
                <div class=" text-center d-flex flex-column d-inline-flex ">
                    <h3 class="border border-4 border-dark bg-dark text-light"><span
                            class="text-warning m-2">Event:</span>{{
                                activeEvent?.name }}</h3>
                    <h3 class="border border-4 border-dark bg-dark text-light"><span
                            class="text-warning m-2">Location:</span> {{
                                activeEvent.location }}</h3>
                    <h3 class="border border-4 border-dark bg-dark text-light"><span class="text-warning m-2">Start
                            Date:</span>{{
                                activeEvent.startDate }}</h3>
                    <h3 class="border border-1 border-dark bg-dark text-warning m-2">spots left: <span class="text-danger">
                            {{
                                activeEvent.capacity
                            }}</span> </h3>
                </div>
                <div class="col-8s ">
                    <p class="border border-1 m-1 border-dark bgBlue rounded elevation-5 text-dark">{{
                        activeEvent.description }}

                    </p>
                    {{ activeEvent.comments }}

                </div>

                <div class="d-inline-flex justify-content-evenly m-2">
                    <button @click="getTicket" class="btn btn-success btn-sm ">
                        Attend Event
                    </button>

                </div>

                <div class="col-6">
                </div>
                <div class="col-6 text-center offset-2">
                    <img class="profile-pic border border-3 border-warning" :src="activeEvent.creator.picture" alt="">
                    <h1>{{ activeEvent.creator.name }}</h1>
                </div>
                <button v-if="activeEvent.creatorId == account?.id" @click="deleteEvent(eventId)"
                    class="btn btn-danger">Delete
                    Listing
                    <i class="mdi mdi-delete-forever"></i></button>
            </div>
        </section>
        <section v-else>
            <i class="mdi mdi-loading mdi-spin text-primary fs-2">loading</i>
        </section>
    </div>
    <section>
        <CommentForm />
        <div class="row">
            <div v-for=" c  in  comments " :key="c.id" class="col-6">
                <commentCard :comment="c" />
            </div>

        </div>

        <div class="col-10 elevation-5  C.card towerCard text-light text-center p-3 ">
            <p class="text-warning fs-3">
                <u> comments:</u>
            </p>
            <div>
                <!-- <img :src="comment.creator.picture" alt="picture"> -->

                <div class="border border-warning border-3 rounded bg-secondary p-3">

                    <p class="fs-4"> {{ activeEvent?.comments }} </p>
                </div>

                <!-- <h3>{{ comment.creator.name }}</h3> -->

            </div>
            <!-- <button @click="deleteComment(comment?.id)" v-if="comment?.creator.id == account?.id" class="btn btn-danger"
                title="Delete comment"><i class="mdi mdi-delete"></i> </button> -->


        </div>


    </section>
</template>
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
        })
        async function getEventById() {
            try {
                console.log('am I running');
                const eventId = route.params.eventId
                await eventsService.getEventById(eventId)
                // eventId == AppState.activeEvent
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getTicket() {
            try {
                const ticketId = route.params.eventId
                await ticketsService.getTicket(ticketId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function deleteEvent(eventId) {
            try {
                await eventsService.deleteEvent(eventId)
            } catch (error) {
                logger.error(error)
                Pop.error(error.message)
            }
        }

        async function getComments() {
            try {
                const commentId = route.params.eventId
                await commentsService.getComments(commentId)
                logger.log("are you there comments?", AppState.comments)
            } catch (error) {
                Pop.error
            }
        }

        return {
            getEventById,
            getTicket,
            getComments,
            deleteEvent,
            activeEvent: computed(() => AppState.activeEvent),
            user: computed(() => AppState.user),
            account: computed(() => AppState.account),
            // comments: computed(() => AppState.comments),
            event: computed(() => AppState.events)

        }
    }
}

</script>
<style>
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

.profile-pic {
    height: 100px;
    width: 100px;
    border-radius: 70%;

    object-fit: cover;
    object-position: center;
}
</style>
  