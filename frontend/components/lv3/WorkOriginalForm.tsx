import { FC, FormEvent } from "react"
import { Work } from "model"

export const WorkOriginalForm: FC<{ work: Work }> = ({ work }) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('on submit')
  }

  return (
    <form onSubmit={ onSubmit }>
      <p>原作情報を登録する</p>
      <input type="text" placeholder="原作種別"/>
      <input type="number" placeholder="何巻？"/>
      <input type="text" placeholder="アニメ何話時点？"/>
      <button type="submit">送信</button>
    </form>
  )
}
