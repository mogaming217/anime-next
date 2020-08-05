import { AppProps } from 'next/app'
import Head from 'next/head'
import { GlobalStyle } from 'styles/Global'
import { AuthProvider } from 'hooks/useAuth'
import styled from 'styled-components'
import Constants from 'styles/StyleConst'
import NProgress from 'nextjs-progressbar'
import { Header, Footer } from 'components/lv2'

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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0" />
      </Head>
      <Header />
      <NProgress
        color={ Constants.COLOR.PRIMARY }
        height="1"
        options={{ showSpinner: false }}
      />
      <GlobalStyle />

      <AppContainer>
        <Component { ...pageProps } />
      </AppContainer>

      <Footer />
    </Provider>
  )
}

export default App
