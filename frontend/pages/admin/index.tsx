import { FC } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

const Page: NextPage = () => {
  return <Body />
}

const Body: FC = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/admin/auth/sign_in">ログイン</Link>
        </li>
        <li>
          <Link href="/admin/works">作品一覧</Link>
        </li>
      </ul>
    </>
  )
}

export default Page
