<template>
    <div class="holder border border-3 border-warning rounded bgGreen">

        <p class="text-light text-center p-1"> {{ ticketholder.holderName }} </p>

        <div class="holder-img offset-3">
            <img :src="ticketholder.holderImg" :alt="ticketholder.holderName" :title="ticketholder.holderName">
        </div>

    </div>
</template>
  
<script>
import { Ticket } from '../models/Ticket'
export default {
    props: {
        ticketholder: { type: Ticket, required: true }
    },
    setup() {
        return {


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
</style>