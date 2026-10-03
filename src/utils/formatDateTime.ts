const dateTimeFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

export const formatDateTime = (isoDate: string): string => dateTimeFormatter.format(new Date(isoDate))
