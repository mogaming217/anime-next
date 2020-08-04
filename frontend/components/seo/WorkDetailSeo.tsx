import { NextSeo } from "next-seo";
import { FC } from "react";
import { Work, Original, originalTypeLabel } from "model";
import { Const } from "lib/const";
import { seasonLabel } from "enum/season";
import { publicEnv } from "env";

export const WorkDetailSeo: FC<{ work: Work, originals: Original[] }> = ({ work, originals }) => {
  const original = originals[0]
  let originalMessage = ''
  if (original) {
    originalMessage = `気になる続きは${originalTypeLabel(original.originalType)}で読むことができます！詳細情報はこちら！`
  }

  return (
    <NextSeo
      title={ `${work.title}の原作情報｜${Const.SERVICE_NAME}` }
      description={ `${work.year}年の${seasonLabel(work.season)}アニメである${work.title}の続きは原作の何巻から読めるのか！？${originalMessage}` }
      openGraph={{
        url: `${publicEnv.host}/works/${work.id}`,
        images: [{
          url: work.imageURL || Const.DEFAULT_OG_IMAGE,
        }]
      }}
    />
  )
}
