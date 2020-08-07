import { Original, OriginalLink, OriginalType } from "model"
import firebase from 'firebase/app'
import { FirestoreRepository } from "./firestore";
import { compactMap } from "helper/array";
import { firestore } from "lib/firebase/client";

export class OriginalRepository extends FirestoreRepository {
  constructor(
    readonly db: firebase.firestore.Firestore = firestore,
  ) {
    super(db)
  }

  decode(snap: firebase.firestore.DocumentSnapshot): Original | undefined {
    const data = snap.data()
    if (!data) return
    let link: OriginalLink | undefined
    if (data.link) {
      link = new OriginalLink(data.link.amazon)
    }
    return new Original(snap.id, data.originalType, data.animeEpisodeNo, data.originalNo, link, data.title, data.imageURL)
  }

  async create(myUserID: string, workID: string, data: { originalType: OriginalType, originalNo: string | undefined, animeEpisodeNo: string | undefined }): Promise<Original> {
    const ref = this.originalsRef(workID).doc()
    await ref.set({
      originalType: data.originalType,
      originalNo: data.originalNo || null,
      animeEpisodeNo: data.animeEpisodeNo || null,
      userID: myUserID,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    return new Original(ref.id, data.originalType, data.animeEpisodeNo, data.originalNo, undefined, null, null)
  }

  async fetchOriginals(workID: string, limit: number = 10): Promise<Original[]> {
    const result = await this.originalsRef(workID).limit(limit).get()
    return compactMap(result.docs, doc => this.decode(doc))
  }

  subscribeOriginals(workID: string, onUpdate: (originals: Original[]) => void) {
    return this.originalsRef(workID).onSnapshot(snap => {
      const originals = compactMap(snap.docs, doc => this.decode(doc))
      onUpdate(originals)
    })
  }
}
