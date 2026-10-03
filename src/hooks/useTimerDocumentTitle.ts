import { useEffect } from 'react'

import { APP_NAME } from '../constants/brand'
import { TAB_TITLE_SEPARATOR } from '../constants/stopwatch'
import { formatDuration } from '../utils/formatDuration'

export const useTimerDocumentTitle = (elapsedMs: number, taskName: string, isActive: boolean): void => {
    const formattedTime = formatDuration(elapsedMs)
    const trimmedTaskName = taskName.trim()

    useEffect(() => {
        if (!isActive) {
            return
        }

        const baseTitle = document.title
        const titleParts = [formattedTime, trimmedTaskName, APP_NAME].filter(Boolean)

        document.title = titleParts.join(TAB_TITLE_SEPARATOR)

        return () => {
            document.title = baseTitle
        }
    }, [formattedTime, trimmedTaskName, isActive])
}