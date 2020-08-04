import { FC, useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Constants from 'styles/StyleConst'
import { TextInput } from 'components/lv1'
import { Search } from 'react-feather'

type Props = {
  placeholder?: string,
  searchText?: string,
  height?: number,
}

type SearchInputProps = {
  height: number,
}

const Form = styled.form<SearchInputProps>`
  width: 100%;
  height: ${(props) => props.height}px;
  padding: 0px ${props => props.height / 4}px;
  border-radius: ${Constants.CORNER_RADIUS.DEFAULT}px;
  box-shadow: ${Constants.SHADOW.DEFAULT};
  display: flex;
  justify-content: start;
  align-items: center;
`

const SearchInput = styled(TextInput)`
  width: 100%;
  height: 100%;
  outline-style: none;
  border-style: none;
  flex: 1;
`

export const SearchBar: FC<Props> = (props: Props) => {
  const router = useRouter()
  const [searchText, setSearchText] = useState("")

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`/search?q=${searchText}`)
  }

  const height = props.height || 36
  return (
    <Form onSubmit={ onSearch } height={ height }>
      <Search size={ 16 } />
      <SearchInput
        type="text"
        placeholder={ props.placeholder || 'アニメのタイトルを入力' }
        onChange={ e => setSearchText(e.target.value) }
      />
    </Form>
  )
}
