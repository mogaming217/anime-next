import { LoadingIndicator } from 'components/lv1'
import { useAuth } from 'hooks/useAuth'
import { FC } from 'react'

export const WithAdmin: FC = ({ children }) => {
  const authState = useAuth()
  if (authState.loading) return <LoadingIndicator />
  if (authState.user?.isAdmin !== true) return <div>権限が足りねぇ！</div>
  return <>{children}</>
}
