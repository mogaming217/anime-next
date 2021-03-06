import { Work, Original } from 'model'
import { useState, useEffect } from 'react'
import { OriginalRepository } from 'repository'

type ReturnType = {
  loading: boolean
  originals: Original[]
  addOriginal: (original: Original) => void
}

export const useWorkOriginals = (work: Work, defaultOriginals?: Original[]): ReturnType => {
  const [originals, setOriginals] = useState<Original[]>(defaultOriginals || [])
  const [loading, setLoading] = useState(true)
  const originalRepo = new OriginalRepository()

  useEffect(() => {
    const defaultLength = defaultOriginals?.length || 0
    if (defaultLength !== 0 && defaultLength === originals.length) {
      setLoading(false)
      return
    }

    let cancel = false
    const unsubscribe = originalRepo.subscribeOriginals(work.id, originals => {
      if (!cancel) {
        setLoading(false)
        setOriginals(originals)
      }
    })

    return () => {
      unsubscribe()
      cancel = true
    }
  }, [work])

  const addOriginal = (original: Original) => {
    setOriginals([original, ...originals])
  }

  return { loading, originals, addOriginal }
}
