import { firestore } from "firebase-admin"

/// queryに対してbatchSizeずつ取得してexecutorに渡してくれる
export async function findInBatch(query: firestore.Query, batchSize: number, executor: (snapshot: firestore.QueryDocumentSnapshot[]) => Promise<any>): Promise<void> {
  let hasNextPage = true
  let lastDocument: firestore.DocumentSnapshot | undefined

  while (hasNextPage) {
    // 1件多めに取得して次がまだあるか判断する
    let q = query.limit(batchSize + 1)
    if (lastDocument) {
      // 前回の続きから取得
      q = q.startAt(lastDocument)
    }

    const snapshot = await q.get()

    // 取得できた件数が指定通りだったら次のデータがまだある
    hasNextPage = snapshot.size === (batchSize + 1)
    // snapshot.docsをpopしても要素が消えないのでコピーした配列に対して操作する
    const docs = snapshot.docs.concat()
    if (hasNextPage) {
      // 続きから取得する用に1件とっておく
      lastDocument = docs.pop()
    }

    // batch処理してもらう
    try {
      await executor(docs)
    } catch (error) {
      throw error
    }
  }
}
