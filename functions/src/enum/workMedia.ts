export const WorkMedia = {
  TV: 'TV',
  OVA: 'OVA',
  MOVIE: 'MOVIE',
  WEB: 'WEB',
  OTHER: 'OTHER'
} as const
export type WorkMedia = typeof WorkMedia[keyof typeof WorkMedia]
