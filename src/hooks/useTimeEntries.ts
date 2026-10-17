import { useCallback, useEffect, useMemo, useState } from 'react'

import { loadTimeEntries, saveTimeEntries } from '../services/timeEntriesStorage'
import type { NewTimeEntry, TimeEntry, TimeEntryUpdate } from '../types/timeEntry'

interface UseTimeEntriesResult {
  entries: TimeEntry[]
  totalDurationMs: number
  addEntry: (entry: NewTimeEntry) => void
  updateEntry: (id: string, update: TimeEntryUpdate) => void
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

  const updateEntry = useCallback((id: string, update: TimeEntryUpdate) => {
    setEntries((previous) => previous.map((entry) => (entry.id === id ? { ...entry, ...update } : entry)))
  }, [])

  const removeEntry = useCallback((id: string) => {
    setEntries((previous) => previous.filter((entry) => entry.id !== id))
  }, [])

  const totalDurationMs = useMemo(() => entries.reduce((sum, entry) => sum + entry.durationMs, 0), [entries])

  return { entries, totalDurationMs, addEntry, updateEntry, removeEntry }
}