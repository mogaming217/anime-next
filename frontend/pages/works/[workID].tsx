import * as React from 'react'
import { NextPageContext, NextPage } from 'next'
import { App } from 'components/App'
import { WorkDetail } from 'components/lv4/WorkDetail'
import { WorkRepository } from 'repository/work'
import { WorkDetailSeo } from 'components/seo'
import { Work, Original } from 'model'
import { OriginalRepository } from 'repository'

interface Props {
  work: Work | undefined // FIXME: 型は仮
  originals: Original[]
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
          <WorkDetail work={ work } originals={ props.originals } />
        </>
      )}
    </App>
  )
}

Page.getInitialProps = async ({ res, query }: NextPageContext): Promise<Props> => {
  const workID = query.workID as string
  const workRepo = new WorkRepository()
  const originalRepo = new OriginalRepository()
  const [work, originals] = await Promise.all([
    workRepo.find(workID),
    originalRepo.fetchOriginals(workID)
  ])
  if (!work && res) res.statusCode = 404
  return { work, originals }
}

export default Page
