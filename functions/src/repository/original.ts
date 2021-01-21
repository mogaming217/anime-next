import { Repository } from './base'
import { firestore } from 'firebase-admin'
import { Original, OriginalLinkSite } from '../model/original'

export class OriginalRepository extends Repository {
  decode(snap: firestore.DocumentSnapshot): Original | undefined {
    const workID = snap.ref.parent.parent?.id
    const data = snap.data()
    if (!(workID && data)) return
    // FIXME: もう少しちゃんと
    return new Original(snap.id, workID, data.originalType, data.animeEpisodeNo, data.originalNo, data.link, data.title, data.imageURL)
  }

  setAffiriateInfo(original: Original, info: { title: string; link: { site: OriginalLinkSite; url: string }; imageURL: string | null }) {
    const link: any = {}
    link[info.link.site] = info.link.url
    return this.originalsRef(original.workID).doc(original.id).update({
      title: info.title,
      link,
      imageURL: info.imageURL,
    })
  }
}
