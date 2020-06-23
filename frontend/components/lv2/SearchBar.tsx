import { FC, useState, FormEvent } from 'react'
import { useRouter } from 'next/router'

type Props = {
  placeholder?: string
}

export const SearchBar: FC<Props> = (props: Props) => {
  const router = useRouter()
  const [searchText, setSearchText] = useState("")

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`/search?q=${searchText}`)
  }

  return (
    <form onSubmit={ onSearch }  >
      <input
        type="text"
        placeholder={ props.placeholder || 'アニメのタイトルを入力' }
        onChange={ e => setSearchText(e.target.value) }
      />
    </form>
  )
}
