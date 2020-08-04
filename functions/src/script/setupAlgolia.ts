import { initializeProject } from "./helper"
import { SearchRepository } from "../repository"
const app = initializeProject('prod')

const main = async () => {
  const searchRepo = new SearchRepository(app.firestore())
  await searchRepo.setWorkSettings()
  process.exit(0)
}

main()
