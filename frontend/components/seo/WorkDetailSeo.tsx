import { NextSeo } from "next-seo";
import { FC } from "react";
import { Work } from "model";
import { Const } from "lib/const";
import { seasonLabel } from "enum/season";
import { publicEnv } from "env";

export const WorkDetailSeo: FC<{ work: Work }> = ({ work }) => {
  return (
    <NextSeo
      title={ `${work.title}の原作情報｜${Const.SERVICE_NAME}` }
      description={ `${work.year}年の${seasonLabel(work.season)}アニメである${work.title}の続きは原作の何巻から読めるのか！？原作の種類はコミック、ライトノベル（ラノベ）、小説？` }
      openGraph={{
        url: `${publicEnv.host}/works/${work.id}`,
        images: [{
          url: work.imageURL || Const.DEFAULT_OG_IMAGE,
        }]
      }}
    />
  )
}
