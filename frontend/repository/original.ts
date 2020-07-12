import { Work, Original, OriginalLink } from "model";
import { firestore } from 'lib/firebase/client'
import firebase from 'firebase/app'
import { FirestoreRepository } from "./firestore";
import { compactMap } from "helper/array";

export class OriginalRepository extends FirestoreRepository {
  decode(snap: firebase.firestore.DocumentSnapshot): Original | undefined {
    const data = snap.data()
    if (!data) return
    let link: OriginalLink | undefined
    if (data.link) {
      link = new OriginalLink(data.link.amazon)
    }
    return new Original(data.originalType, data.animeEpisodeNo, data.originalNo, link)
  }

  async fetchOriginals(workID: string, limit: number = 10): Promise<Original[]> {
    const result = await this.originalsRef(workID).limit(limit).get()
    return compactMap(result.docs, doc => this.decode(doc))
  }
}
