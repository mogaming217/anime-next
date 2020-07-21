import { DefaultSeo as DS } from 'next-seo'
import { clientEnv } from 'env'

export const DefaultSeo = () => <DS
  openGraph={{
    type: 'website',
    title: 'アニオリ｜アニメの続きを楽しめる原作情報メディア',
    description: 'おもしろかったアニメの続きは原作の何巻から読めるのかがすぐ見つかる！原作のマンガやライトノベル、小説をすぐ購入できるサービスです。',
    url: clientEnv.host,
    images: [{
      url: `${clientEnv.host}/assets/ogimage/default.png`,
    }],
    locale: 'ja_JP'
  }}
  twitter={{
    cardType: 'summary_large_image',
  }}
/>
