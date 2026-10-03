import { useCallback, useEffect, useMemo, useState } from 'react'

import { loadTimeEntries, saveTimeEntries } from '../services/timeEntriesStorage'
import type { NewTimeEntry, TimeEntry } from '../types/timeEntry'

interface UseTimeEntriesResult {
  entries: TimeEntry[]
  totalDurationMs: number
  addEntry: (entry: NewTimeEntry) => void
  removeEntry: (id: string) => void
}

export const useTimeEntries = (): UseTimeEntriesResult => {
  const [entries, setEntries] = useState<TimeEntry[]>(loadTimeEntries)

  useEffect(() => {
    saveTimeEntries(entries)
  }, [entries])

  const addEntry = useCallback((entry: NewTimeEntry) => {
    setEntries((previous) => [{ id: crypto.randomUUID(), ...entry }, ...previous])
  }, [])

  const removeEntry = useCallback((id: string) => {
    setEntries((previous) => previous.filter((entry) => entry.id !== id))
  }, [])

  const totalDurationMs = useMemo(() => entries.reduce((sum, entry) => sum + entry.durationMs, 0), [entries])

  return { entries, totalDurationMs, addEntry, removeEntry }
}
