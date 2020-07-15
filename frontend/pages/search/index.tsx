import { NextPage, NextPageContext } from 'next'
import { App } from 'components/App'
import { SearchRepository } from 'repository/search'
import { WorkCard } from 'components/lv2/WorkCard'
import { Work } from 'model'
import styled from 'styled-components'
import { SearchBar } from 'components/lv2/SearchBar'

type Props = {
  searchText: string | null,
  works: Work[]
}

const WorkListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const SearchPage: NextPage<Props> = (props: Props) => {
  return (
    <App>
      <SearchBar searchText={ props.searchText || undefined } />
      <WorkListContainer>
        {props.works.map(work => (<WorkCard key={ work.annictID } work={ work } />))}
      </WorkListContainer>
    </App>
  )
}

SearchPage.getInitialProps = async ({ query }: NextPageContext): Promise<Props> => {
  const keyword = query.q as string | null
  const repo = new SearchRepository()
  if (!keyword) {
    return { searchText: keyword, works: [] }
  }

  const works = await repo.searchWorks(keyword) as Work[] // FIXME: 型は仮
  return {
    searchText: keyword,
    works
  }
}

export default SearchPage
