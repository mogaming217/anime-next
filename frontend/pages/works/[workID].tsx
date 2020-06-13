import * as React from 'react'
import { NextPageContext, NextPage } from 'next'
import { firestore } from 'lib/firebase/client'
import { App } from 'components/App'

interface Props {
  work: any | null // FIXME: 型は仮
}

const Page: NextPage<Props> = (props: Props) => {
  return (
    <App>
      <div>{ props.work?.title || 'Not found' }</div>
    </App>
  )
}

Page.getInitialProps = async ({ query }: NextPageContext): Promise<Props> => {
  const workID = query.workID as string
  const result = await firestore.collection('works').doc(workID).get()
  return { work: result.data() || null }
}

export default Page
