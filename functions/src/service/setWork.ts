import { Season } from '../enum/season'
import { AnnictRepository, WorkRepository, AmazonRepository, SearchRepository } from '../repository'
import { firestore } from 'firebase-admin'
import { Logger } from '../common/logger'
import { Work } from '../model'
import { sleep } from '../common/sleep'
import { Result, Failure, Success } from '../common/result'

type SetWorkErrorCode = 'annict_error' | 'unexpected'

type SetWorkResult = {
  setImageFailedWorkIDs: string[]
}

type SetImageURLResult = {
  succeededWorkIDs: string[]
  failedWorkIDs: string[]
}

export class SetWorkService {
  private annictRepo: AnnictRepository
  private workRepo: WorkRepository
  private amazonRepo: AmazonRepository
  private searchRepo: SearchRepository

  constructor(db: firestore.Firestore = firestore()) {
    this.annictRepo = new AnnictRepository()
    this.workRepo = new WorkRepository(db)
    this.amazonRepo = new AmazonRepository()
    this.searchRepo = new SearchRepository(db)
  }

  async execute(
    year: number,
    season: Season,
    options: { skipToGetAdditionalImage?: boolean; registerToAlgolia?: boolean } = {
      skipToGetAdditionalImage: true,
      registerToAlgolia: true,
    }
  ): Promise<Result<SetWorkResult, SetWorkErrorCode>> {
    try {
      Logger.info({ type: 'start_set_works', query: { year, season } })

      const annictResult = await this.annictRepo.fetchWorks([{ year, season }], 500)
      if (annictResult.isFailure) {
        Logger.error({ type: 'fetch_annict_failed', query: { year, season }, error: annictResult.error })
        return new Failure('annict_error')
      }
      const works = annictResult.value
      Logger.debug({ message: 'fetched_works', length: works.length, query: { year, season } })

      // firestoreに保存
      await this.workRepo.save(works)

      if (options.registerToAlgolia) {
        await this.searchRepo.registerWorks(works)
      }
      if (options.skipToGetAdditionalImage) return new Success({ setImageFailedWorkIDs: [] })

      const setImageResult = await this.setImageURLToWorks(works, 2)
      return new Success({ setImageFailedWorkIDs: setImageResult.failedWorkIDs })
    } catch (error) {
      Logger.error({ type: 'unexpected', year, season }, error)
      return new Failure('unexpected')
    }
  }

  async setImageURLToWorks(works: Work[], sleepingSec = 1): Promise<SetImageURLResult> {
    const succeededWorkIDs: string[] = []
    const failedWorkIDs: string[] = []

    for (const work of works) {
      if (work.imageURL) {
        succeededWorkIDs.push(work.id)
        continue
      }

      try {
        const imageURL = await this.amazonRepo.fetchImageURL(work.title)
        work.imageURL = imageURL
        await this.workRepo.updateImageURL(work)
        succeededWorkIDs.push(work.id)
      } catch {
        failedWorkIDs.push(work.id)
      }

      if (sleepingSec > 0) await sleep(sleepingSec * 1000)
    }

    return {
      succeededWorkIDs,
      failedWorkIDs,
    }
  }
}
