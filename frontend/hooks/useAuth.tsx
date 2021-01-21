import { useState, useEffect, createContext, ReactNode, useContext } from 'react'
import { auth } from 'lib/firebase/client'
import firebase from 'firebase/app'
import { User, Me } from 'model/user'

type UseAuthErrorCode = 'unexpected'

type AuthReturnType = {
  loading: boolean
  user?: User
  error?: UseAuthErrorCode
}

const convertUser = (user: firebase.User): User => {
  return new Me(user.uid)
}

const _useAuth = (): AuthReturnType => {
  const [authState, setAuth] = useState<AuthReturnType>({ loading: true })
  useEffect(() => {
    let cancel = false

    const unsubscribe = auth.onAuthStateChanged(
      async user => {
        if (cancel) return
        if (user) {
          setAuth({ loading: false, user: convertUser(user) })
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
