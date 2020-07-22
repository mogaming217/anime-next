import * as React from 'react'
import { NextPageContext, NextPage } from 'next'
import { App } from 'components/App'
import { WorkDetail } from 'components/lv4/WorkDetail'
import { WorkRepository } from 'repository/work'
import { WorkDetailSeo } from 'components/seo'
import { Work } from 'model'

interface Props {
  work: Work | undefined // FIXME: 型は仮
}

const Page: NextPage<Props> = (props: Props) => {
  const work = props.work
  return (
    <App>
      { !work && (
        <div>not found</div>
      ) }

      { work && (
        <>
          <WorkDetailSeo work={ work } />
          <WorkDetail work={ work } />
        </>
      )}
    </App>
  )
}

Page.getInitialProps = async ({ res, query }: NextPageContext): Promise<Props> => {
  const workID = query.workID as string
  const workRepo = new WorkRepository()
  const work = await workRepo.find(workID)
  if (!work && res) res.statusCode = 404
  return { work }
}

export default Page
