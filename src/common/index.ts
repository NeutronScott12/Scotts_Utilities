export const sluggify = (word: string): string =>
    word.replace(/ /g, '-').toLowerCase()

export const normalisePort = (port: number | string): number => {
    if (typeof port === 'string') {
        return parseInt(port)
    } else {
        return port
    }
}
