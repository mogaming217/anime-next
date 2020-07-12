import { Work, Original } from "model"
import { useState, useEffect } from "react"
import { OriginalRepository } from "repository"

type ReturnType = {
  loading: boolean,
  originals: Original[],
  addOriginal: (original: Original) => void
}

export const useWorkOriginals = (work: Work): ReturnType => {
  const [originals, setOriginals] = useState<Original[]>([])
  const [loading, setLoading] = useState(true)
  const originalRepo = new OriginalRepository()

  useEffect(() => {
    let cancel = false
    const retrive = async () => {
      setLoading(true)
      const originals = await originalRepo.fetchOriginals(work.id)
      if (!cancel) {
        setOriginals(originals)
        setLoading(false)
      }
    }
    retrive()
    return () => { cancel = true }
  }, [])

  const addOriginal = (original: Original) => {
    setOriginals([original, ...originals])
  }

  return { loading, originals, addOriginal }
}
