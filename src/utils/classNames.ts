type ClassNameValue = string | false | null | undefined

export const classNames = (...names: ClassNameValue[]): string => names.filter(Boolean).join(' ')
