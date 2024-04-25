import { type ClassValue, clsx as cn } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function clsx(...inputs: ClassValue[]) {
  return twMerge(cn(inputs))
}
