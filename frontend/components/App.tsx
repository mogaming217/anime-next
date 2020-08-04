import React from 'react'
import { GlobalStyle } from 'styles/Global'
import { AuthProvider } from 'hooks/useAuth'
import styled from 'styled-components'
import Constants from 'styles/StyleConst'
import Head from "next/head"
import NProgress from 'nextjs-progressbar'
import { Header, Footer } from 'components/lv2'
import { DefaultSeo } from 'components/seo'

const AppContainer = styled.div`
  position: relative;
  padding: ${Constants.HEIGHT.HEADER}px ${Constants.PADDING.SIDE}px 32px;
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
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0" />
      </Head>
      <DefaultSeo />

      <Header />
      <NProgress
        color={ Constants.COLOR.PRIMARY }
        height="1"
        options={{ showSpinner: false }}
      />
      <GlobalStyle />
      <AppContainer>
        {children}
      </AppContainer>
      <Footer />
    </Provider>
  )
}
