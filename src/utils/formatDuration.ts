import {
  DURATION_PAD_LENGTH,
  MINUTES_IN_HOUR,
  MS_IN_SECOND,
  MS_IN_TENTH,
  SECONDS_IN_MINUTE,
} from '../constants/stopwatch'
import type { DurationParts } from '../types/stopwatch'

const padUnit = (value: number): string => String(value).padStart(DURATION_PAD_LENGTH, '0')

export const splitDuration = (durationMs: number): DurationParts => {
  const totalSeconds = Math.floor(durationMs / MS_IN_SECOND)
  const hours = Math.floor(totalSeconds / (SECONDS_IN_MINUTE * MINUTES_IN_HOUR))
  const minutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE) % MINUTES_IN_HOUR
  const seconds = totalSeconds % SECONDS_IN_MINUTE
  const tenths = Math.floor((durationMs % MS_IN_SECOND) / MS_IN_TENTH)

  return { hours: padUnit(hours), minutes: padUnit(minutes), seconds: padUnit(seconds), tenths: String(tenths) }
}

export const formatDuration = (durationMs: number): string => {
  const { hours, minutes, seconds } = splitDuration(durationMs)

  return `${hours}:${minutes}:${seconds}`
}
