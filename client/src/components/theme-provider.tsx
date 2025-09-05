import { ThemeProvider as NextThemesProvider } from "@/hooks/use-theme"
import { type ReactNode } from "react"

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: "dark" | "light" | "system"
  storageKey?: string
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
