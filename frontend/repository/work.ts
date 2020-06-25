import { Work } from "model";
import { firestore } from 'lib/firebase/client'
import firebase from 'firebase/app'

export class WorkRepository {
  constructor(readonly db: firebase.firestore.Firestore = firestore) {}

  get worksRef() { return this.db.collection('works') }

  decode(snap: firebase.firestore.DocumentSnapshot): Work | undefined {
    const data = snap.data()
    if (!data) return
    return new Work(data.annictID, data.title, data.imageURL)
  }

  async find(workID: string): Promise<Work | undefined> {
    const result = await this.worksRef.doc(workID).get()
    return this.decode(result)
  }
}
