import { firestore } from "firebase-admin";

export class Repository {
  constructor(readonly db: firestore.Firestore = firestore()){}

  get worksRef() {
    return this.db.collection('works')
  }
}
