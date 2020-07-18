import { firestore } from 'lib/firebase/client'
import firebase from 'firebase/app'
import { WorkRepository } from './work'
import { compactMap } from 'helper/array'

export class TrendRepository {
  private workRepo: WorkRepository
  constructor(readonly db: firebase.firestore.Firestore = firestore) {
    this.workRepo = new WorkRepository(db)
  }

  async fetchTrendWorks(_count: number) {
    // FIXME: ひとまず仮で workID 指定で返す
    const workIDs: string[] = [
      '6089', // 鬼滅の刃
      '6081', // かぐや様
      '6462', // 虚構推理
      '6665', // 映像研
      '6328', // ダーウィンズゲーム
      '5121', // メイドインアビス
    ]
    const works = await Promise.all(workIDs.map(id => this.workRepo.find(id)))
    return compactMap(works, work => work)
  }
}
