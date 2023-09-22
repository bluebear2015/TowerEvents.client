import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { Ticket } from '../models/Ticket'

class TicketsService {





    async getTicket(ticketId) {

        const ticketData = { eventId: ticketId, accountId: AppState.account.id }
        // debugger
        const res = await api.post('api/tickets/', ticketData)
        logger.log('[CREATING tickets]', res.data)

        AppState.activeEvent.ticketCount += 1 // Increment ticket count based on the number of received tickets

        AppState.tickets.push(new Ticket(res.data))
        AppState.myTickets.push(new Ticket(res.data))
    }

    async getTicketByEventId(eventId) {
        // debugger
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('[CREATING tickets]', res.data)
        AppState.tickets = res.data.map(t => new Ticket(t))
    }

    async deleteTicket(ticketId) {
        // const ticketData = { eventId: ticketId, accountId: AppState.account.id }
        const res = await api.delete('api/tickets/' + ticketId)

        AppState.tickets = AppState.tickets.filter(t => t.id !== ticketId)

        AppState.activeEvent.ticketCount-- // Decrement ticket count when a ticket is deleted
    }


    async getAccountTickets() {
        const res = await api.get('api/tickets/account')
        AppState.tickets = res.data.map(t => new Ticket(t))


    }
}
export const ticketsService = new TicketsService()

