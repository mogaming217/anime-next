import { firestore } from "lib/firebase/client";

export class SearchRepository {

  async searchWorks(keyword?: string) {
    // TODO: use algolia

    const sampleWorkIDs = ['6089', '6399']
    const result = await Promise.all(sampleWorkIDs.map(id => firestore.collection('works').doc(id).get()))
    return result.map(r => r.data()!)
  }
}
