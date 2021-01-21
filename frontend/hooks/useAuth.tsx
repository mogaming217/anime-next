import { useState, useEffect, createContext, ReactNode, useContext } from 'react'
import { auth } from 'lib/firebase/client'
import firebase from 'firebase/app'
import { Me } from 'model/user'

type UseAuthErrorCode = 'unexpected'

type AuthReturnType = {
  loading: boolean
  user?: Me
  error?: UseAuthErrorCode
}

const convertUser = (user: firebase.User, token?: firebase.auth.IdTokenResult): Me => {
  return new Me(user.uid, token?.claims.role === 'admin')
}

const _useAuth = (): AuthReturnType => {
  const [authState, setAuth] = useState<AuthReturnType>({ loading: true })
  useEffect(() => {
    let cancel = false

    const unsubscribe = auth.onAuthStateChanged(
      async user => {
        if (cancel) return
        if (user) {
          if (user.isAnonymous) {
            setAuth({ loading: false, user: convertUser(user) })
          } else {
            const tokens = await user.getIdTokenResult()
            let me = convertUser(user, tokens)
            if (!me.isAdmin) {
              const refreshed = await user.getIdTokenResult(true)
              me = convertUser(user, refreshed)
            }
            setAuth({ loading: false, user: convertUser(user, tokens) })
          }
          return
        }

        try {
          const credential = await auth.signInAnonymously()
          if (credential.user) {
            setAuth({ loading: false, user: convertUser(credential.user) })
            return
          }

          setAuth({ loading: false })
        } catch (error) {
          console.error(error)
          setAuth({ loading: false, error: 'unexpected' })
        }
      },
      error => {
        if (cancel) return
        console.error(error)
        // FIXME: 適切なエラーに変換
        setAuth({ loading: false, error: 'unexpected' })
      }
    )

    return () => {
      cancel = true
      unsubscribe()
    }
  }, [])
  return authState
}

export const AuthContext = createContext<AuthReturnType>({ loading: true })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const state = _useAuth()
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
