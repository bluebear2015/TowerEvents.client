<template>
    <section class="container-fluid">
        <div class="">

            <div class="holder hero-img border border-3 border-warning rounded">
                <div class="holder-img">
                    <img :src="ticketholder.holderImg" :alt="ticketholder.holderName" :title="ticketholder.holderName">
                </div>
                <h4 class="m-2 bg-dark text-warning text-center p-1 text-decoration-underline"> {{
                    ticketholder.eventName }}</h4>



                <p class=" text-center fw-bold bg-warning text-dark">

                    {{ ticketholder.eventLocation }}!!

                </p>
                <div class="text-light">

                </div>

            </div>
        </div>
    </section>
</template>
  
<script>
import { computed } from 'vue'
import { Ticket } from '../models/Ticket'
import { AppState } from '../AppState.js'
AppState
export default {
    props: {
        ticketholder: { type: Ticket, required: true }
    },
    setup() {
        return {
            account: computed(() => AppState.account)

        }
    }
}
</script>

<style scoped>
.holder {
    margin: 0.25rem;
}

.bgGreen {
    background-color: #201b09e9
}

.holder-img {
    width: 2rem;
    height: 2rem;
}

.holder-img img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.hero-img {

    background-image: url('https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');

    background-repeat: repeat;
    object-fit: cover;

}
</style>