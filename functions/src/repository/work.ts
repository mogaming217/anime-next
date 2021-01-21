import { firestore } from 'firebase-admin'
import { Repository } from './base'
import { Work } from '../model'
import { handleInBatch } from '../helper/array'

export class WorkRepository extends Repository {
  workDataForSet(work: Work): firestore.DocumentData {
    return {
      annictID: work.annictID,
      title: work.title,
      titleEn: work.titleEn,
      titleKana: work.titleKana,
      imageURL: work.imageURL,
      season: work.season,
      year: work.year,
      media: work.media,
      updatedAt: firestore.Timestamp.now(), // あまり重要ではないのであえてserverTimestampを使わない
    }
  }

  decode(snapshot: firestore.DocumentSnapshot): Work | undefined {
    const data = snapshot.data()
    if (!data) return
    return new Work(data.annictID, data.title, data.titleEn, data.titleKana, data.imageURL, data.season, data.year, data.media)
  }

  async find(workID: string) {
    const snap = await this.worksRef.doc(workID).get()
    return this.decode(snap)
  }

  async save(works: Work[]) {
    return handleInBatch(works, 500, async list => {
      const batch = this.db.batch()
      list.forEach(work => {
        batch.set(this.worksRef.doc(work.id), this.workDataForSet(work), { merge: true })
      })
      return batch.commit()
    })
  }

  async updateImageURL(work: Work) {
    return this.worksRef.doc(work.id).update({
      imageURL: work.imageURL,
      updatedAt: firestore.Timestamp.now(),
    })
  }
}
