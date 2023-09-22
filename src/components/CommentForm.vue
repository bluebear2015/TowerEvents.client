<template>
  <section class="row p-5">
    <div class="rounded elevation-5 fredoka-one col-10 towerCard">
      <div class="text-center p-2 rounded-bottom text-white fw-bold">
        <!-- Comment Input Field? -->
        <input class="width:100%" type="text" v-model="comment.body" placeholder="Enter your comment" />
        <!-- Post Comment Button? -->
        <button @click="postComment">Post Comment</button>
      </div>
    </div>
  </section>
</template>
    
   
  
<script>

import { ref } from 'vue'

import { logger } from '../utils/Logger.js'
import { commentsService } from '../services/CommentsService.js'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'

export default {

  setup() {
    const comment = ref({})




    async function postComment() {
      try {
        await commentsService.createComment(AppState.activeEvent.id, comment.value)
        Pop.toast('Comment Created')

        comment.value = ''
      } catch (error) {
        logger.error(error)
      }
    }

    return {
      comment,
      postComment

    }
  }
}
</script>
<style>
.towerCard {
  width: 90%;
  height: 90%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  background-color: #153e50a4;

}
</style>