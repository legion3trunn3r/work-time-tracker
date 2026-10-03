export enum StopwatchStatus {
  Idle = 'idle',
  Running = 'running',
  Paused = 'paused',
}

export interface DurationParts {
  hours: string
  minutes: string
  seconds: string
  tenths: string
}
