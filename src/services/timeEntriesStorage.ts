import { TIME_ENTRIES_STORAGE_KEY } from '../constants/stopwatch'
import type { TimeEntry } from '../types/timeEntry'

const isTimeEntry = (value: unknown): value is TimeEntry => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.taskName === 'string' &&
    typeof candidate.durationMs === 'number' &&
    typeof candidate.finishedAt === 'string'
  )
}

export const loadTimeEntries = (): TimeEntry[] => {
  try {
    const rawValue = window.localStorage.getItem(TIME_ENTRIES_STORAGE_KEY)

    if (!rawValue) {
      return []
    }

    const parsedValue: unknown = JSON.parse(rawValue)

    return Array.isArray(parsedValue) ? parsedValue.filter(isTimeEntry) : []
  } catch {
    return []
  }
}

export const saveTimeEntries = (entries: TimeEntry[]): void => {
  try {
    window.localStorage.setItem(TIME_ENTRIES_STORAGE_KEY, JSON.stringify(entries))
  } catch {
  }
}
