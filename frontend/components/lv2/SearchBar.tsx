import { FC, useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Constants from 'styles/Constants'

type Props = {
  placeholder?: string,
  height?: number,
}

const Form = styled.form`
  width: 100%;
`

type SearchInputProps = {
  height: number,
}

const SearchInput = styled.input<SearchInputProps>`
  width: 100%;
  height: ${(props) => props.height}px;
  border-style: none;
  border-radius: 4px;
  background: ${Constants.COLOR.ACTIVE_BACKGROUND};
  box-shadow: 0px 0px 6px 3px ${Constants.COLOR.SHADOW};
  padding: 0px ${props => props.height / 4}px;
`

export const SearchBar: FC<Props> = (props: Props) => {
  const router = useRouter()
  const [searchText, setSearchText] = useState("")

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`/search?q=${searchText}`)
  }

  return (
    <Form onSubmit={ onSearch }  >

      <SearchInput
        type="text"
        height={ props.height || 36 }
        placeholder={ props.placeholder || 'アニメのタイトルを入力' }
        onChange={ e => setSearchText(e.target.value) }
      />
    </Form>
  )
}
