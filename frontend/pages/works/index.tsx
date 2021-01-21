import { FC } from 'react'
import { NextPage } from 'next'
import { useLatestWorks } from 'hooks/work/useLatestWorks'
import { LabelButton, LoadingIndicator } from 'components/lv1'
import { WorkList } from 'components/lv3'

const Page: NextPage = () => {
  return <Body />
}

const Body: FC = () => {
  const worksState = useLatestWorks()
  return (
    <>
      {worksState.works && <WorkList works={worksState.works} />}
      {worksState.loading && <LoadingIndicator />}
      {worksState.hasNext && <LabelButton label="続きを取得" onClick={worksState.fetchNext} />}
    </>
  )
}

export default Page
