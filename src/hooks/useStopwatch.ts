import { useCallback, useEffect, useState } from 'react'

import { TICK_INTERVAL_MS } from '../constants/stopwatch'
import { StopwatchStatus } from '../types/stopwatch'

interface UseStopwatchResult {
  status: StopwatchStatus
  elapsedMs: number
  start: () => void
  pause: () => void
  stop: () => number
}

export const useStopwatch = (): UseStopwatchResult => {
  const [status, setStatus] = useState<StopwatchStatus>(StopwatchStatus.Idle)
  const [accumulatedMs, setAccumulatedMs] = useState(0)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [tickAt, setTickAt] = useState(0)

  useEffect(() => {
    if (status !== StopwatchStatus.Running) {
      return
    }

    const intervalId = window.setInterval(() => setTickAt(Date.now()), TICK_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [status])

  const measureSegmentMs = useCallback(
    (currentTime: number): number => (startedAt === null ? 0 : Math.max(0, currentTime - startedAt)),
    [startedAt],
  )

  const start = useCallback(() => {
    const currentTime = Date.now()

    setStartedAt(currentTime)
    setTickAt(currentTime)
    setStatus(StopwatchStatus.Running)
  }, [])

  const pause = useCallback(() => {
    setAccumulatedMs((previous) => previous + measureSegmentMs(Date.now()))
    setStartedAt(null)
    setStatus(StopwatchStatus.Paused)
  }, [measureSegmentMs])

  const stop = useCallback((): number => {
    const totalMs = accumulatedMs + measureSegmentMs(Date.now())

    setAccumulatedMs(0)
    setStartedAt(null)
    setStatus(StopwatchStatus.Idle)

    return totalMs
  }, [accumulatedMs, measureSegmentMs])

  const elapsedMs = status === StopwatchStatus.Running ? accumulatedMs + measureSegmentMs(tickAt) : accumulatedMs

  return { status, elapsedMs, start, pause, stop }
}
