import { FC, useEffect } from 'react'
import { NextPage } from 'next'
import { useLatestWorks } from 'hooks/work/useLatestWorks'
import { LabelButton, LoadingIndicator } from 'components/lv1'
import { WorkList } from 'components/lv3'
import { WithAdmin } from 'middleware/admin'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Work } from 'model'
import { functions } from 'lib/firebase/client'

const Page: NextPage = () => {
  return <Body />
}

const arrayRange = (start: number, end: number) => [...Array(1 + end - start).keys()].map(v => start + v)
const years = arrayRange(2000, new Date().getFullYear())

const Body: FC = () => {
  const worksState = useLatestWorks()
  const router = useRouter()

  useEffect(() => {
    const query = router.query
    if (query.year) {
      const year = parseInt(query.year as string)
      worksState.setYear(year)
    }
  }, [router])

  const onDelete = async (work: Work) => {
    const ok = confirm(`${work.title}を本当に削除してもいいですか？`)
    if (!ok) return
    const callable = functions.httpsCallable('c-deleteWork')
    await callable({ workID: work.id })
    worksState.deleteWork(work.id)
  }

  return (
    <WithAdmin>
      <div>
        {years.map(y => (
          <span key={y} style={{ marginRight: 4, textDecoration: y.toString() === router.query.year ? 'underline' : undefined }}>
            <Link href={`/admin/works?year=${y}`}>{`${y}年`}</Link>
          </span>
        ))}
      </div>
      <table>
        {worksState.works &&
          worksState.works.map(work => (
            <tr key={work.id}>
              <td onClick={() => router.push(`/admin/works/${work.id}`)}>
                <img src={work.imageURL ?? undefined} style={{ width: 180 }} alt="img" />
              </td>
              <td>{work.title}</td>
              <td>
                <button onClick={() => onDelete(work)}>削除</button>
              </td>
            </tr>
          ))}
      </table>
      {worksState.loading && <LoadingIndicator />}
      {worksState.hasNext && <LabelButton label="続きを取得" onClick={worksState.fetchNext} />}
    </WithAdmin>
  )
}

export default Page
