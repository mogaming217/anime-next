import { firestore } from 'lib/firebase/client'
import firebase from 'firebase/app'

export class FirestoreRepository {
  constructor(readonly db: firebase.firestore.Firestore = firestore) {}

  get worksRef() {
    return this.db.collection('works')
  }

  workRef(workID: string) {
    return this.worksRef.doc(workID)
  }

  originalsRef(workID: string) {
    return this.workRef(workID).collection('originals')
  }
}
