import firebase from 'firebase/app'
import { compactMap } from 'helper/array'
import { firestore } from 'lib/firebase/client'
import { Work } from 'model'
import { useEffect, useState } from 'react'
import { WorkRepository } from 'repository'

type State = {
  loading: boolean
  works?: Work[]
  hasNext: boolean
  fetchNext: () => void
  setYear: (year: number) => void
  deleteWork: (workID: string) => void
}

export const useLatestWorks = (count = 30): State => {
  const workRepo = new WorkRepository()
  const [loading, setLoading] = useState(true)
  const [hasNext, setHasNext] = useState(false)
  const [_year, _setYear] = useState<number>()
  const [works, setWorks] = useState<Work[]>()
  const [lastSnap, setLastSnap] = useState<firebase.firestore.QueryDocumentSnapshot>()
  const [startAfterSnap, setStartAfterSnap] = useState<firebase.firestore.QueryDocumentSnapshot>()

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)

      let query = firestore.collection('works').limit(count)
      if (_year) query = query.where('year', '==', _year)
      if (startAfterSnap) query = query.startAfter(startAfterSnap)

      const result = await query.get()
      setLastSnap(result.docs[result.size - 1])

      const newWorks = compactMap(result.docs, doc => workRepo.decode(doc))
      setWorks(startAfterSnap ? [...(works ?? []), ...newWorks] : newWorks)
      setLoading(false)
      setHasNext(result.size === count)
    }
    void fetch()
  }, [_year, startAfterSnap])

  const fetchNext = () => {
    if (!hasNext || loading) {
      return
    }
    setStartAfterSnap(lastSnap)
  }

  const deleteWork = (workID: string) => {
    setWorks(works?.filter(w => w.id !== workID))
  }

  const setYear = (year: number) => {
    _setYear(year)
  }

  return { loading, hasNext, works, fetchNext, setYear, deleteWork }
}
