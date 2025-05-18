import React from 'react'
import { ButtonProps } from '@/types'

const Button: React.FC<ButtonProps> = ({
  text = "Click Me",
  className = 'px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600',
  onClick,
  icon
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 ${className}`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {text}
    </button>
  )
}

export default Button
