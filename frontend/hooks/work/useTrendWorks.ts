import { Work } from 'model'
import { useState, useEffect } from 'react'
import { TrendRepository } from 'repository'

type ReturnType = {
  loading: boolean
  works: Work[]
}

export const useTrendWorks = (props: { count: number }): ReturnType => {
  const [works, setWorks] = useState<Work[]>([])
  const [loading, setLoading] = useState(true)
  const trendRepo = new TrendRepository()

  useEffect(() => {
    let cancel = false

    const retrive = async () => {
      setLoading(true)
      const works = await trendRepo.fetchTrendWorks(props.count)
      if (!cancel) {
        setWorks(works)
        setLoading(false)
      }
    }

    retrive()
    return () => {
      cancel = true
    }
  }, [])

  return { loading, works }
}
