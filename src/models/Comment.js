export class Comment {
    constructor(data) {
        this.id = data.id
        this.eventId = data.eventId
        this.creatorId = data.creatorId
        this.body = data.body
        this.isAttending = data.isAttending
        this.creator = data.creator
        this.creatorImg = data.creator.picture
        this.event = data.event
        this.creatorName = data.creator.name

    }


}