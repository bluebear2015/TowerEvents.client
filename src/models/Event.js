export class Event {
    constructor(data) {
        this.id = data.id
        this.type = data.type || null
        this.coverImg = data.coverImg
        this.isCanceled = data.isCanceled
        this.creatorId = data.creatorId
        this.creatorName = data.creator.name
        this.creatorPicture = data.creator.picture
        this.description = data.description
        this.location = data.location
        this.capacity = data.capacity
        this.name = data.name
        this.type = data.type
        this.ticketCount = data.ticketCount
        this.creator = data.creator || {}
        this.startDate = new Date(data.startDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        this.eventId = data.eventId
        this.creator = data.creator
        this.comments = data.comments
        this.tickets = data.tickets
    }
}