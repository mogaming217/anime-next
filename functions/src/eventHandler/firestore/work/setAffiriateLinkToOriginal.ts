import { defaultFunctions } from '../../function'
import { workPath } from '.'
import { OriginalRepository } from '../../../repository/original'
import { firestore } from 'firebase-admin'
import { Original, OriginalLinkSite } from '../../../model/original'
import { AmazonRepository, WorkRepository } from '../../../repository'

const path = workPath + `/originals/{originalID}`

export const setAffiriateLinkToOriginal = defaultFunctions.firestore.document(path).onCreate(async (snapshot, context) => {
  const originalRepo = new OriginalRepository()
  const original = originalRepo.decode(snapshot)
  if (!original) return

  const service = new Service()
  await service.exec(original)
})

export class Service {
  constructor(
    readonly db: firestore.Firestore = firestore(),
    readonly workRepo: WorkRepository = new WorkRepository(db),
    readonly amazonRepo: AmazonRepository = new AmazonRepository(),
    readonly originalRepo: OriginalRepository = new OriginalRepository(db)
  ){}

  async exec(original: Original) {
    const work = await this.workRepo.find(original.workID)
    if (!work) return

    let typeLabel: string
    switch (original.originalType) {
      case 'comic':
        typeLabel = 'コミック'
        break
      case 'lightNovel':
        typeLabel = 'ライトノベル'
        break
      case 'novel':
        typeLabel = '小説'
        break
    }

    const itemInfo = await this.amazonRepo.fetchItemInfo(`${work.title} ${typeLabel} ${original.originalNo || ''}`)
    await this.originalRepo.setAffiriateInfo(original, {
      title: itemInfo.title,
      imageURL: itemInfo.imageURL,
      link: { site: OriginalLinkSite.amazon, url: itemInfo.link }
    })
  }
}
