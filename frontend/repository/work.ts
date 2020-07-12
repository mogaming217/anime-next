import { Work, Original, OriginalLink } from "model";
import { firestore } from 'lib/firebase/client'
import firebase from 'firebase/app'
import { compactMap } from "helper/array";

export class WorkRepository {
  constructor(readonly db: firebase.firestore.Firestore = firestore) {}

  get worksRef() { return this.db.collection('works') }
  workRef(workID: string) { return this.worksRef.doc(workID) }
  originalsRef(workID: string) { return this.workRef(workID).collection('originals') }

  decode(snap: firebase.firestore.DocumentSnapshot): Work | undefined {
    const data = snap.data()
    if (!data) return
    return new Work(data.annictID, data.title, data.imageURL)
  }

  decodeOriginal(snap: firebase.firestore.DocumentSnapshot): Original | undefined {
    const data = snap.data()
    if (!data) return
    let link: OriginalLink | undefined
    if (data.link) {
      link = new OriginalLink(data.link.amazon)
    }
    return new Original(data.originalType, data.animeEpisodeNo, data.originalNo, link)
  }

  async find(workID: string): Promise<Work | undefined> {
    const result = await this.worksRef.doc(workID).get()
    return this.decode(result)
  }

  async fetchOriginals(workID: string, limit: number = 10): Promise<Original[]> {
    const result = await this.originalsRef(workID).limit(limit).get()
    return compactMap(result.docs, doc => this.decodeOriginal(doc))
  }
}
