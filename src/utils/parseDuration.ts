import {
    DURATION_INPUT_PATTERN,
    MINUTES_IN_HOUR,
    MS_IN_SECOND,
    SECONDS_IN_MINUTE,
} from '../constants/stopwatch'

/** Parses a "HH:MM:SS" string into milliseconds. Returns null if the format is invalid. */
export const parseDuration = (value: string): number | null => {
    const match = DURATION_INPUT_PATTERN.exec(value.trim())

    if (!match) {
        return null
    }

    const [, hours, minutes, seconds] = match
    const totalSeconds =
        Number(hours) * MINUTES_IN_HOUR * SECONDS_IN_MINUTE + Number(minutes) * SECONDS_IN_MINUTE + Number(seconds)

    return totalSeconds * MS_IN_SECOND
}