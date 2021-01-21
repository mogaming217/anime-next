import { Work } from 'model'
import firebase from 'firebase/app'
import { FirestoreRepository } from './firestore'

export class WorkRepository extends FirestoreRepository {
  decode(snap: firebase.firestore.DocumentSnapshot): Work | undefined {
    const data = snap.data()
    if (!data) return
    return new Work(data.annictID, data.title, data.imageURL, data.season, data.year)
  }

  async find(workID: string): Promise<Work | undefined> {
    const result = await this.worksRef.doc(workID).get()
    return this.decode(result)
  }
}
