<template>
  <section class="d-flex flex-colum justify-content-between p-3">
    <div class="col-10 elevation-5 offset-3 C.card towerCard text-light text-center p-3 ">
      <p class="text-warning fs-3">
        <u> comments:</u>
      </p>
      <div>
        <img :src="comment.creator.picture" alt="picture">

        <div class="border border-warning border-3 rounded bg-secondary p-3">

          <p class="fs-4"> {{ comment.body }} </p>
        </div>

        <h3>{{ comment.creator.name }}</h3>

      </div>
      <button @click="deleteComment(comment?.id)" v-if="comment?.creator.id == account?.id" class="btn btn-danger"
        title="Delete comment"><i class="mdi mdi-delete"></i> </button>


    </div>
  </section>
</template>
  
 

<script>
import { commentsService } from '../services/CommentsService.js'
import { AppState } from '../AppState.js'
import { computed } from 'vue'
import { logger } from '../utils/Logger.js'



export default {
  props: {
    comment: { type: Object, required: true }
  },
  setup() {

    async function deleteComment(commentId) {
      try {
        await commentsService.deleteComment(commentId);
      } catch (error) {
        logger.error(error);
      }
    }

    return {
      deleteComment,
      account: computed(() => AppState.account),

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
  box-shadow: 0 0 10px rgba(170, 60, 60, 0.3);
  border-radius: 1rem;
  background-color: #153e50a4;

}
</style>