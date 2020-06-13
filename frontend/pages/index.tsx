import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { App } from 'components/App'
import { Sample } from 'components/Sample'
import { serverEnv, clientEnv } from 'env'

type Props = {
  sampleValue?: string,
  host: string
}

const RootPage: NextPage<Props> = (props: Props) => (
  <App>
    <Sample />
    <div>{ props.sampleValue }{ props.host }</div>
  </App>
)

RootPage.getInitialProps = ({}: NextPageContext): Props => {
  // 404へいって、その後TOPへ返ってくるとちゃんとエラーになるので、サーバー側でしか読み取れない
  let value = serverEnv.sampleValue
  return {
    sampleValue: value,
    host: clientEnv.host
  }
}

export default RootPage
