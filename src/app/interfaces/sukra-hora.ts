export interface Hora {
    id: number
    start: Date
    end: Date
}

export interface DayDetails {
    date: Date
    sunrise: Date
    sunset: Date
}

export interface SukraHora {
    id: number
    details: DayDetails
    dayTimings: Array<Hora>
    nightTimings: Array<Hora>
}
