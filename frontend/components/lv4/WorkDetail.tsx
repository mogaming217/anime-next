import { FC, useState, useEffect } from "react";
import { Work, Original } from "model";
import { WorkImage } from "components/lv1/WorkImage";
import styled from "styled-components";
import Constants from "styles/Constants";
import { firestore } from "lib/firebase/client";
import { compactMap } from "helper/array";

type Props = {
  work: Work
}

const WorkTitle = styled.div`
  font-size: ${Constants.FONT.LARGE}px;
  font-weight: ${Constants.FONT_WEIGHT.BOLD};
`

const useWorkOriginals = (work: Work): { loading: boolean, originals:Original[] } => {
  const [originals, setOriginals] = useState<Original[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancel = false
    const retrive = async () => {
      setLoading(true)
      const result = await firestore.collection('works').doc(work.id).collection('originals').limit(10).get()
      if (!cancel) {
        const originals = compactMap(result.docs, doc => new Original(doc.data()))
        setOriginals(originals)
        setLoading(false)
      }
    }
    retrive()
    return () => { cancel = true }
  }, [])

  return { loading, originals }
}

const WorkOriginal: FC<{ work: Work }> = (props) => {
  const { loading, originals } = useWorkOriginals(props.work)
  if (loading) return (
    <div>...loading</div>
  )

  if (originals.length === 0) return (
    <div>no data</div>
  )

  return (
    <div>
      {originals.map((original, i) => (
        <div key={`original_${i}`}>{original.data}</div>
      ))}
    </div>
  )
}

export const WorkDetail: FC<Props> = (props: Props) => {
  const work = props.work
  return (
    <div>
      <WorkImage src={ work.imageURL } width={120} height={120} />
      <WorkTitle>{ work.title }</WorkTitle>
      <WorkOriginal work={ work }/>
    </div>
  )
}
