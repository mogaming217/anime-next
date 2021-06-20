import { firestore } from 'lib/firebase/client'
import firebase from 'firebase/app'
import { WorkRepository } from './work'
import { compactMap } from 'helper/array'
import { SearchRepository } from './search'
import { Work } from 'model'

export class TrendRepository {
  private workRepo: WorkRepository
  private searchRepo: SearchRepository
  constructor(readonly db: firebase.firestore.Firestore = firestore) {
    this.workRepo = new WorkRepository(db)
    this.searchRepo = new SearchRepository()
  }

  async fetchTrendWorks(_count: number): Promise<Work[]> {
    // FIXME: ひとまず仮で workID 指定で返す
    const workIDs: string[] = [
      '7603', // 東京リベンジャーズ
      '7252', // 不滅のあなたへ
      '7154', // スーパーカブ
      '7707', // シャドーハウス
      '6619', // 無職転生
      '7162', // 呪術廻戦
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

  async fetchRelatedWorks(work: Work, count: number): Promise<Work[]> {
    // ひとまず同じ期のアニメ
    const works = await this.searchRepo.searchWorks(`${work.year}_${work.season}`, count)
    return works
  }
}
