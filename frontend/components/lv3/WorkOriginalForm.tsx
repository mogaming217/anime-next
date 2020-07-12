import { FC, useState } from "react"
import { useForm } from 'react-hook-form'
import { Work, OriginalType, Original } from "model"
import styled from "styled-components";
import { OriginalRepository } from "repository";
import { useAuth } from "hooks/useAuth";

type Props = {
  work: Work,
  onCreate?: (original: Original) => void
}

type FormInputData = {
  originalType: OriginalType,
  animeEpisodeNo?: string,
  originalNo?: string,
}

const InputContentContainer = styled.div`
`

export const WorkOriginalForm: FC<Props> = ({ work, onCreate }) => {
  const authState = useAuth()
  const [ isSubmitting, updateIsSubmitting ] = useState<boolean>(false)
  const { handleSubmit, register, errors, reset } = useForm<FormInputData>()

  const onSubmit = handleSubmit(async body => {
    if (!OriginalType[body.originalType] || !authState.user) {
      return
    }

    const original = new Original(body.originalType, body.animeEpisodeNo, body.originalNo, undefined)
    const repo = new OriginalRepository(authState.user.id)
    updateIsSubmitting(true)
    try {
      await repo.create(work.id, original)
      reset()
      if (onCreate) onCreate(original)
    } catch (error) {
      console.error(error)
    } finally {
      updateIsSubmitting(false)
    }
  })

  return (
    <form onSubmit={ onSubmit }>
      <p>原作情報を登録する</p>

      <InputContentContainer>
        <label id='originalType'>原作種別</label>
        <input id='originalType' name='originalType' ref={ register({ required: true }) } type="text" placeholder='原作種別' />
      </InputContentContainer>

      <InputContentContainer>
        <label id='animeEpisodeNo'>アニメ何話時点？</label>
        <input id='animeEpisodeNo' name='animeEpisodeNo' ref={ register } type="text" placeholder='アニメ何話時点？' />
      </InputContentContainer>

      <InputContentContainer>
        <label id='originalNo'>原作何巻？</label>
        <input id='originalNo' name='originalNo' ref={ register } type="text" placeholder='原作何巻？' />
      </InputContentContainer>

      <button type="submit" disabled={ isSubmitting || authState.loading || !authState.user }>送信</button>

      {Object.keys(errors).length > 0 && (
        <div>入力エラー</div>
      )}
    </form>
  )
}
