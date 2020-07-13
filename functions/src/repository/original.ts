import { Repository } from "./base";
import { firestore } from "firebase-admin";
import { Original } from "../model/original";

export class OriginalRepository extends Repository {
  decode(snap: firestore.DocumentSnapshot): Original | undefined {
    const workID = snap.ref.parent.parent?.id
    const data = snap.data()
    if (!(workID && data)) return
    // FIXME: もう少しちゃんと
    return new Original(snap.id, workID, data.originalType, data.animeEpisodeNo, data.originalNo, data.link, data.title, data.imageURL)
  }

  setAffiriateInfo(original: Original, info: { title: string, link: string, imageURL: string | null }) {
    return this.originalsRef(original.workID).doc(original.id).update({
      title: info.title,
      link: info.link,
      imageURL: info.imageURL,
    })
  }
}
