export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export const allSeasons: Season[] = ['spring', 'summer', 'autumn', 'winter']

export const seasonLabel = (season: Season) => {
  switch (season) {
    case 'spring':
      return '春'
    case 'summer':
      return '夏'
    case 'autumn':
      return '秋'
    case 'winter':
      return '冬'
  }
}
