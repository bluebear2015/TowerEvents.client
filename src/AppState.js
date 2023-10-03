import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {import('./models/Event.js').Event} */
  events: {},
  /** @type {import('./models/Event.js').Event} */
  activeEvent: {},
  /** @type {import('./models/Ticket.js').Ticket} */
  myTickets: {},
  /** @type {import('./models/Ticket.js').Ticket} */
  activeTicketHolders: {},
  comments: [],
  /** @type {import('./models/Ticket.js').Ticket} */
  tickets: {},
  attendees: {},
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {}
})
