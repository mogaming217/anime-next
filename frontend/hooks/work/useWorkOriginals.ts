import { Work, Original } from "model"
import { useState, useEffect } from "react"
import { WorkRepository } from "repository/work"

export const useWorkOriginals = (work: Work): { loading: boolean, originals: Original[] } => {
  const [originals, setOriginals] = useState<Original[]>([])
  const [loading, setLoading] = useState(true)
  const workRepo = new WorkRepository()

  useEffect(() => {
    let cancel = false
    const retrive = async () => {
      setLoading(true)
      const originals = await workRepo.fetchOriginals(work.id)
      if (!cancel) {
        setOriginals(originals)
        setLoading(false)
      }
    }
    retrive()
    return () => { cancel = true }
  }, [])

  return { loading, originals }
}
