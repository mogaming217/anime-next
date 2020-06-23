import { NextPage } from 'next'
import { App } from 'components/App'
import { SearchBar } from 'components/lv2/SearchBar'

const RootPage: NextPage = () => {
  return (
    <App>
      <SearchBar
        placeholder='アニメのタイトルを入力 例）鬼滅の刃'
      />
    </App>
  )
}

export default RootPage
