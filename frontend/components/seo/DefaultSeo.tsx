import { DefaultSeo as DS } from 'next-seo'
import { publicEnv } from 'env'
import { Const } from 'lib/const'

export const DefaultSeo = () => <DS
  openGraph={{
    type: 'website',
    title: `${Const.SERVICE_NAME}｜アニメの続きの原作情報が探せるサービス`,
    description: 'おもしろかったアニメの続きは原作の何巻から読めるのかがすぐ見つかる！原作のマンガやライトノベル、小説をすぐ購入できるサービスです。',
    url: publicEnv.host,
    images: [{
      url: Const.DEFAULT_OG_IMAGE,
    }],
    locale: 'ja_JP'
  }}
  twitter={{
    cardType: 'summary_large_image',
  }}
/>
