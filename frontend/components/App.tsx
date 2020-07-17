import React from 'react'
import { GlobalStyle } from 'styles/Global'
import { AuthProvider } from 'hooks/useAuth'
import styled from 'styled-components'
import Constants from 'styles/Constants'
import NProgress from 'nextjs-progressbar'

const AppContainer = styled.div`
  position: relative;
  padding: 0px 8px 32px;
  margin: 0 auto;
  max-width: ${Constants.WIDTH.CONTENT_MAX}px;
  min-height: 100vh;
`

const Provider = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
)

export const App: React.FC = ({ children }) => {
  return (
    <Provider>
      <NProgress
        color={ Constants.COLOR.PRIMARY }
        height="1"
        options={{ showSpinner: false }}
      />
      <GlobalStyle />
      <AppContainer>
        {children}
      </AppContainer>
    </Provider>
  )
}
