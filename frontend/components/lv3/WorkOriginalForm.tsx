import { FC, useState } from "react"
import { useForm } from 'react-hook-form'
import { Work, OriginalType, Original } from "model"
import styled from "styled-components";
import { OriginalRepository } from "repository";
import { useAuth } from "hooks/useAuth";
import Constants from "styles/Constants";
import { TextInput, Button } from "components/lv1";

const Form = styled.form`
  background-color: ${Constants.COLOR.FORM_BACKGROUND};
  padding: 20px;
  border-radius: 8px;
  border-width: 0px;
`

const FormTitle = styled.div`
  font-size: ${Constants.FONT.MEDIUM};
  font-weight: ${Constants.FONT_WEIGHT.BOLD};
`

const InputContentContainer = styled.div`
  margin-top: 16px;

  label.radio {
    display: inline-flex;
    padding-right: 10px;
  }
`

const ContentName = styled.div`
  display: block;
  margin-bottom: 4px;
`

const SubmitContainer = styled.div`
  padding: 16px 0px 0px;
  text-align: center;
`

type Props = {
  work: Work,
  onCreate?: (original: Original) => void
}

type FormInputData = {
  originalType: OriginalType,
  animeEpisodeNo?: string,
  originalNo?: string,
}

export const WorkOriginalForm: FC<Props> = ({ work, onCreate }) => {
  const authState = useAuth()
  const [ isSubmitting, updateIsSubmitting ] = useState<boolean>(false)
  const { handleSubmit, register, errors, reset } = useForm<FormInputData>()

  const onSubmit = handleSubmit(async body => {
    if (!authState.user) { return }
    if (!(OriginalType[body.originalType] && body.originalNo)) {
      // FIXME: show error message
      return
    }

    const repo = new OriginalRepository()
    updateIsSubmitting(true)
    try {
      const original = await repo.create(authState.user.id, work.id, {
        originalType: body.originalType,
        originalNo: body.originalNo,
        animeEpisodeNo: body.animeEpisodeNo
      })
      reset()
      if (onCreate) onCreate(original)
    } catch (error) {
      console.error(error)
    } finally {
      updateIsSubmitting(false)
    }
  })

  return (
    <Form onSubmit={ onSubmit }>
      <FormTitle>原作情報を登録する</FormTitle>

      <InputContentContainer>
        <ContentName>原作の種類（必須）</ContentName>

        <label className="radio">
          <input name="originalType" type="radio" value="comic" ref={register({ required: true })} id="comic"/>
          コミック
        </label>

        <label className="radio">
          <input name="originalType" type="radio" value="lightNovel" ref={register({ required: true })} id="lightNovel"/>
          ライトノベル
        </label>

        <label className="radio">
          <input name="originalType" type="radio" value="novel" ref={register({ required: true })} id="novel"/>
          小説
        </label>
      </InputContentContainer>

      <InputContentContainer>
        <ContentName id='originalNo'>アニメの続きは何巻から？（必須）</ContentName>
        <TextInput id='originalNo' name='originalNo' ref={ register({ required: true }) } type="text" placeholder='例）8巻、小説タイトル' />
      </InputContentContainer>

      <InputContentContainer>
        <ContentName id='animeEpisodeNo'>アニメ何話時点？</ContentName>
        <TextInput id='animeEpisodeNo' name='animeEpisodeNo' ref={ register } type="text" placeholder='例）最終話' />
      </InputContentContainer>

      <SubmitContainer>
        <Button type="submit" disabled={ isSubmitting || authState.loading || !authState.user }>
          登録する
        </Button>
      </SubmitContainer>

      {Object.keys(errors).length > 0 && (
        <div>入力エラー</div>
      )}
    </Form>
  )
}
