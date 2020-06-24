import { NextPage, NextPageContext } from 'next'
import { App } from 'components/App'
import { SearchRepository } from 'repository/search'
import { WorkCard } from 'components/lv2/WorkCard'

// TODO: 仮
type Work = {
  annictID: string
  title: string
  imageURL?: string
}

type Props = {
  works: Work[]
}

const SearchPage: NextPage<Props> = (props: Props) => {
  return (
    <App>
      {props.works.map(work => (<WorkCard key={ work.annictID } work={ work } />))}
    </App>
  )
}

SearchPage.getInitialProps = async ({ query }: NextPageContext): Promise<Props> => {
  const keyword = query.q as string | undefined
  const repo = new SearchRepository()
  if (!keyword) {
    return { works: [] }
  }

  const works = await repo.searchWorks(keyword) as Work[] // FIXME: 型は仮
  return {
    works
  }
}

export default SearchPage
