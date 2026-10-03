export interface TimeEntry {
  id: string
  taskName: string
  durationMs: number
  finishedAt: string
}

export type NewTimeEntry = Omit<TimeEntry, 'id'>
