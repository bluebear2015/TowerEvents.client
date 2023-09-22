import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {import('./models/Event.js').Event} */
  events: [],
  /** @type {import('./models/Event.js').Event|null} */
  activeEvent: [],
  /** @type {import('./models/Ticket.js').Ticket|null} */
  myTickets: [],
  /** @type {import('./models/Ticket.js').Ticket|null} */
  activeTicketHolders: [],
  comments: [],

  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {}
})
