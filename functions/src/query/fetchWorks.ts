// FIXME: 少々雑なやり方だけど、.gqlファイルをインポートするのは手間なので文字列で宣言している
export default `
query fetchWorks($seasons: [String!], $first: Int!) {
  searchWorks(
    seasons: $seasons,
    first: $first
  ) {
    nodes {
      annictId
      title
      titleEn
      titleKana
    }
  }
}
`
