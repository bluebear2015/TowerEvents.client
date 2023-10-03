import { api } from "./AxiosService.js";
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";



class CommentsService {

    async getComments(commentId) {


        const res = await api.get("api/events/" + commentId + "/comments")
        AppState.comments = res.data.map(c => new Comment(c))
        AppState.comments.push(new Comment(res.data))
        logger.log(res.data, "is this your comment?")

        return res.data


    }

    async createComment(eventId, commentData) {
        commentData.eventId = eventId
        const res = await api.post("api/comments/", commentData)
        logger.log(res.data)

        AppState.comments.push(new Comment(res.data))
        const newComment = new Comment(res.data)

        logger.log("this is the comment", Comment, newComment)
        return res.data



    }

    async deleteComment(commentId) {

        const res = await api.delete("api/comments/" + commentId)
        logger.log(res.data)
        AppState.comments = AppState.comments.filter(c => c.id !== commentId)

        return res.data

    }



}
export const commentsService = new CommentsService()