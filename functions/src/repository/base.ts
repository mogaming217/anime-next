import { firestore } from 'firebase-admin'

export class Repository {
  constructor(readonly db: firestore.Firestore = firestore()) {}

  get worksRef() {
    return this.db.collection('works')
  }

  originalsRef(workID: string) {
    return this.worksRef.doc(workID).collection('originals')
  }
}
