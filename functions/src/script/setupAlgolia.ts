import { initializeProject } from "./helper"
import { SearchRepository } from "../repository"
initializeProject('dev')

const main = async () => {
  const searchRepo = new SearchRepository()
  await searchRepo.setWorkSettings()
  process.exit(0)
}

main()
