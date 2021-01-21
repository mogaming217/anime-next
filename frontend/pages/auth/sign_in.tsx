import { FC } from 'react'
import { NextPage } from 'next'
import { LabelButton } from 'components/lv1'
import firebase from 'firebase/app'
import { auth } from 'lib/firebase/client'
import { useAuth } from 'hooks/useAuth'
import Link from 'next/link'

const Page: NextPage = () => {
  return <Body />
}

const Body: FC = () => {
  const authState = useAuth()

  const onGoogleLogin = async () => {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  return (
    <>
      <LabelButton label="Google" onClick={onGoogleLogin} />
      {authState.user && (
        <div>
          userID: {authState.user.id}
          <div>
            <Link href="/works">作品一覧</Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Page
