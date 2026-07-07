'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: 'light',
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme | undefined>('light')

  const setTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState('light')
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('payload-theme', 'light')
      document.documentElement.setAttribute('data-theme', 'light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', 'light')
      document.documentElement.classList.remove('dark')
    }
    if (theme !== 'light') {
      setThemeState('light')
    }
  }, [theme])

  return <ThemeContext value={{ setTheme, theme: 'light' }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
