
import { api } from "./AxiosService.js";
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";


class EventsService {


    async getEvents() {

        const res = await api.get("api/events")
        AppState.events = res.data.map(e => new Event(e))
        // logger.log('miles', res.data)


    }
    async cancelEvent(eventId) {

        const res = await api.delete("api/events/" + eventId)
        logger.log(res.data)

        AppState.events = AppState.events.filter(c => c.id != eventId)
        return res.data

    }
    async createEvent(formData) {

        const res = await api.post("api/events", formData)
        logger.log(res.data)
        AppState.events.push(new Event(res.data))

        const newEvent = new Event(res.data)
        AppState.events.unshift(newEvent)
        return res.data



    }

    async getEventById(eventId) {

        const res = await api.get(`api/events/${eventId}`)
        logger.log('work dammit', res.data)
        AppState.activeEvent = new Event(res.data)
        logger.log(AppState.activeEvent)

    }

}


export const eventsService = new EventsService()