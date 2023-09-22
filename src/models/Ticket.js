export class Ticket {
    constructor(data) {
        this.id = data.id
        this.accountId = data.accountId
        this.eventId = data.eventId
        this.Profile = data.profile
        this.event = data.event
        this.description = data.description
    }
}