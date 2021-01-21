import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

const NotFoundPage: NextPage = () => {
  return (
    <>
      <div>Not Found</div>
      <Link href="/">
        <a>TOP</a>
      </Link>
    </>
  )
}

export default NotFoundPage
