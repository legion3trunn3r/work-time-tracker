import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'

import { classNames } from '../../utils/classNames'
import styles from '../../styles/TextField.module.scss'

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'> {
  label: string
  error?: string | null
}

export const TextField = ({ label, error, ...inputProps }: TextFieldProps) => {
  const inputId = useId()
  const errorId = `${inputId}-error`

  return (
    <div className={styles['text-field']}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        {...inputProps}
        id={inputId}
        className={classNames(styles.input, Boolean(error) && styles._invalid)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}
