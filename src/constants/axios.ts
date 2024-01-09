import type { AxiosRequestConfig } from 'axios'

// This shows up in so many places it should just be a constant
export const withCredentials: AxiosRequestConfig = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
}
