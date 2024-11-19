/**
 * Type definition of the news.
 */
export type News = {
    title: string,
    date: string,
    author: string,
    content: string,
}

/**
 * Type definition of the event.
 */
export type Event = {
    /**
     * Title of the event
     */
    title: string,
    
    /**
     * Starting date of the event, in format "YYYY-MM-DD"
     */
    dateStart: string,

    /**
     * Ending date of the event, in format "YYYY-MM-DD"
     * 
     * If the event is a one-day event, the dateEnd field will be the same as the dateStart field.
     */
    dateEnd: string,

    /**
     * a detailed description of the event, in Markdown format
     */
    description: string,

    /**
     * the tier of the event (either I, II, III, or IV)
     */
    tier: number,

    /**
     * If the event is concluded, the result field will be filled with the result of the event.
     * Otherwise, the result field will be null.
     */
    result: {
        albemarle: number,
        hobler: number,
        lambert: number,
        ettl: number,
    }?,

    /**
     * If the event is concluded, the winner field will be filled with the name of the winner.
     */
    winner: string?,
}