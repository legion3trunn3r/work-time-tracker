import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { classNames } from '../../utils/classNames'
import styles from '../../styles/Button.module.scss'

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Ghost = 'ghost',
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant
  icon?: ReactNode
}

export const Button = ({
  variant = ButtonVariant.Primary,
  icon,
  type = 'button',
  disabled,
  children,
  ...buttonProps
}: ButtonProps) => (
  <button
    {...buttonProps}
    type={type}
    disabled={disabled}
    aria-disabled={disabled}
    className={classNames(styles.button, styles[`_${variant}`], !children && styles['_icon-only'])}
  >
    {icon}
    {children}
  </button>
)
