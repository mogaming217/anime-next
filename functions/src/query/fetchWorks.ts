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
