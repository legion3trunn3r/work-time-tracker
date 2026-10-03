import { StopwatchStatus } from '../types/stopwatch'

export const TICK_INTERVAL_MS = 100
export const MS_IN_SECOND = 1000
export const MS_IN_TENTH = 100
export const SECONDS_IN_MINUTE = 60
export const MINUTES_IN_HOUR = 60
export const DURATION_PAD_LENGTH = 2
export const MIN_ENTRY_DURATION_MS = MS_IN_SECOND

export const TASK_NAME_MAX_LENGTH = 80
export const TASK_NAME_REQUIRED_MESSAGE = 'Укажите, какую задачу вы отслеживаете'
export const TIME_ENTRIES_STORAGE_KEY = 'time-tracker:entries'

export const TAB_TITLE_SEPARATOR = ' | '

export const STOPWATCH_STATUS_LABELS: Record<StopwatchStatus, string> = {
  [StopwatchStatus.Idle]: 'Готов к запуску',
  [StopwatchStatus.Running]: 'Идёт отсчёт',
  [StopwatchStatus.Paused]: 'На паузе',
}
