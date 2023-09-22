<template>
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- SECTION form -->
        <form @submit.prevent="createEvent()">
            <div class="modal-body text-bold">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="event Title"
                        v-model="editable.title">
                    <label for="floatingInput">event Title</label>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingPassword" placeholder="Cover Image"
                        v-model="editable.coverImg">
                    <label for="floatingPassword">Cover Image</label>
                </div>


                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Name" v-model="editable.name">
                    <label for="floatingInput">Name</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="floatingInput" placeholder="Capacity"
                        v-model="editable.capacity">
                    <label for="floatingInput">Capacity</label>
                </div>


                <div class="form-floating mb-3">
                    <input type="date" class="form-control" id="floatingInput" placeholder="Start Date"
                        v-model="editable.startDate">
                    <label for="floatingInput">Start Date</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Location"
                        v-model="editable.location">
                    <label for="floatingInput">Location</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Description"
                        v-model="editable.description">
                    <label for="floatingInput">Description</label>
                </div>


                <!-- <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="floatingInput" placeholder="Ticket Count"
                        v-model="editable.ticketCount">
                    <label for="floatingInput">ticket Count</label>
                </div> -->


                <div>
                    <select name="type" id="type" v-model="editable.type">
                        <option value="other">other</option>
                        <option value="digital">digital</option>
                        <option value="convention">convention</option>
                        <option value="concert">concert</option>
                        <option value="sport">sport</option>

                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Create event</button>
            </div>
        </form>

    </div>
</template>



<script>
import { computed, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';

import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { AppState } from '../AppState.js';

export default {
    setup() {
        const editable = ref({})
        const router = useRouter()
        return {
            editable,

            Event: computed(() => AppState.events),

            async createEvent() {
                try {
                    logger.log('creating event')
                    const formData = editable.value
                    const newEvent = await eventsService.createEvent(formData)
                    Modal.getOrCreateInstance('#createEvent').hide()
                    editable.value = {}
                    router.push({ name: 'Event Details', params: { eventId: newEvent.id } })
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            }
        };
    },
};
</script>

<style></style>