import { NextSeo } from "next-seo";
import { FC } from "react";
import { Work } from "model";

export const WorkDetailSeo: FC<{ work: Work }> = ({ work }) => <NextSeo
  title={ `${work.title}の原作情報｜アニオリ` }
/>
