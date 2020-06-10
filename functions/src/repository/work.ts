import { firestore } from "firebase-admin";
import { Repository } from "./base";
import { Work } from "../model";
import { handleInBatch } from "../util/array";

export class WorkRepository extends Repository {
  workDataForSet(work: Work): firestore.DocumentData {
    return {
      annictID: work.annictID,
      title: work.title,
      titleEn: work.titleEn,
      titleKana: work.titleKana
    }
  }

  async save(works: Work[]) {
    return handleInBatch(works, 500, async list => {
      const batch = this.db.batch()
      list.forEach(work => {
        batch.set(this.worksRef.doc(), this.workDataForSet(work), { merge: true })
      })
      return batch.commit()
    })
  }
}
