import { NextPage, NextPageContext } from 'next'
import { SearchBar } from 'components/lv2'
import { WorkList } from 'components/lv3'
import { SearchRepository } from 'repository/search'
import { Work } from 'model'
import styled from 'styled-components'

type Props = {
  searchText: string | null,
  works: Work[]
}

const SearchBarContainer = styled.div`
  padding: 16px 0px;
`

const SearchPage: NextPage<Props> = (props: Props) => {
  return (
    <>
      <SearchBarContainer>
        <SearchBar searchText={ props.searchText || undefined } />
      </SearchBarContainer>
      <WorkList works={ props.works } />
    </>
  )
}

SearchPage.getInitialProps = async ({ query }: NextPageContext): Promise<Props> => {
  const keyword = query.q as string | null
  const repo = new SearchRepository()
  if (!keyword) {
    return { searchText: keyword, works: [] }
  }

  const works = await repo.searchWorks(keyword)
  return {
    searchText: keyword,
    works
  }
}

export default SearchPage
