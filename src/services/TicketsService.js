import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { Ticket } from '../models/Ticket'





class TicketsService {

    //     async getTicket(eventId) {

    //         const ticketData = { eventId: eventId, accountId: AppState.account.id };
    //         const res = await api.post('api/tickets/', ticketData);
    //         logger.log('[CREATING tickets]', res.data);

    //         AppState.activeEvent.ticketCount += 1; // Increment ticket count based on the number of received tickets

    //         // Update the attendees list for this event
    //         if (!AppState.attendees[eventId]) {
    //             AppState.attendees[eventId] = [];
    //         }
    //         AppState.attendees[eventId].push(AppState.account.name);
    //         logger.log('Attendees for Active Event:', AppState.attendees[AppState.activeEvent?.id]);

    //         logger.log('My Tickets:', AppState.myTickets);

    //         AppState.myTickets.push(new Ticket(res.data));
    //         logger.log(AppState.myTickets);
    // return

    //     }




    async getTicket(ticketId) {

        const ticketData = { eventId: ticketId, accountId: AppState.account.id }
        // debugger
        const res = await api.post('api/tickets/', ticketData)
        // logger.log('[CREATING tickets]', res.data)

        AppState.activeEvent.ticketCount += 1 // Increment ticket count based on the number of received tickets

        // AppState.tickets.push(new Ticket(res.data))
        // AppState.attendees.push(new Attendee(res.data))
        logger.log(AppState.myTickets)

    }

    async getEventTicket(eventId) {
        const post = {
            eventId: eventId,
            userId: AppState.user.id
        }
        const res = await api.post('api/tickets', post)
        const newTicket = new Ticket(res.data);
        logger.log(newTicket)
        if (!Array.isArray(AppState.myTickets)) {
            AppState.myTickets = [];
        }
        if (!Array.isArray(AppState.tickets)) {
            AppState.tickets = [];
        }
        localStorage.setItem('myTickets', JSON.stringify(AppState.myTickets));
        AppState.tickets.push(newTicket);
        AppState.myTickets.push(newTicket)
        logger.log('tickets', AppState.tickets, 'MY TICKETS', AppState.myTickets);
        logger.log('Ticket obtained:', newTicket);
    }



    async getTicketsByEventId(eventId) {
        logger.log(eventId)
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log(res.data)
        AppState.tickets = res.data.map(t => new Ticket(t))
        logger.log('tickets', AppState.tickets)
    }

    async deleteThisTicket(ticketId) {
        const res = await api.delete(`api/tickets/${ticketId}`)
        AppState.tickets = AppState.tickets?.filter(t => t.id != ticketId)
        AppState.myTickets = AppState.myTickets?.filter(t => t.id !== ticketId)
        logger.log('tickets', AppState.tickets);
        logger.log('myTickets', AppState.myTickets);
        return res.data
    }




    async getMyTicketsFromApi() {
        const res = await api.get(`account/tickets`)
        AppState.myTickets = res.data.map(t => new Ticket(t))
        logger.log('tickets', AppState.tickets)
    }
}
export const ticketsService = new TicketsService()

