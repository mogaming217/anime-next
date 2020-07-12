import React from 'react'
import { GlobalStyle } from 'styles/Global'
import { AuthProvider } from 'hooks/useAuth'

const Provider = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
)

export const App: React.FC = ({ children }) => {
  return (
    <Provider>
      <GlobalStyle />
      {children}
    </Provider>
  )
}
