import { Work, Original } from "model";
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
    return new Original(data)
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
