import { Work, Original } from "model"
import { useState, useEffect } from "react"
import { OriginalRepository } from "repository"

type ReturnType = {
  loading: boolean,
  originals: Original[],
  addOriginal: (original: Original) => void
}

export const useWorkOriginals = (work: Work, defaultOriginals?: Original[]): ReturnType => {
  const [originals, setOriginals] = useState<Original[]>(defaultOriginals || [])
  const [loading, setLoading] = useState(true)
  const originalRepo = new OriginalRepository()

  useEffect(() => {
    if (defaultOriginals?.length === originals.length) {
      setLoading(false)
      return
    }

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
  }, [work])

  const addOriginal = (original: Original) => {
    setOriginals([original, ...originals])
  }

  return { loading, originals, addOriginal }
}
