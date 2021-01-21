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
}

export const useLatestWorks = (count = 30): State => {
  const workRepo = new WorkRepository()
  const [loading, setLoading] = useState(true)
  const [hasNext, setHasNext] = useState(false)
  const [works, setWorks] = useState<Work[]>()
  const [lastSnap, setLastSnap] = useState<firebase.firestore.QueryDocumentSnapshot>()
  const [startAfterSnap, setStartAfterSnap] = useState<firebase.firestore.QueryDocumentSnapshot>()

  useEffect(() => {
    const fetch = async () => {
      let query = firestore.collection('works').orderBy('year', 'desc').limit(count)
      if (startAfterSnap) {
        query = query.startAfter(startAfterSnap)
      }

      const result = await query.get()
      setLastSnap(result.docs[result.size - 1])

      const newWorks = compactMap(result.docs, doc => workRepo.decode(doc))
      setWorks(startAfterSnap ? [...(works ?? []), ...newWorks] : newWorks)
      setLoading(false)
      setHasNext(result.size === count)
    }
    void fetch()
  }, [startAfterSnap])

  const fetchNext = () => {
    if (!hasNext || loading) {
      return
    }
    setStartAfterSnap(lastSnap)
  }

  return { loading, hasNext, works, fetchNext }
}
