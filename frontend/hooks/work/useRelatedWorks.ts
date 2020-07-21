import { Work } from "model";
import { useState, useEffect } from "react";
import { TrendRepository } from "repository";

type ReturnType = {
  loading: boolean
  relatedWorks: Work[]
}

export const useRelatedWorks = (work: Work, count: number = 10): ReturnType => {
  const [relatedWorks, setRelatedWorks] = useState<Work[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancel = false

    const retrive = async () => {
      setLoading(true)
      const trendRepo = new TrendRepository()
      const works = await trendRepo.fetchRelatedWorks(work, count)
      if (!cancel) {
        setLoading(false)
        setRelatedWorks(works)
      }
    }
    retrive()

    return () => {
      cancel = true
    }
  }, [work])

  return { loading, relatedWorks }
}