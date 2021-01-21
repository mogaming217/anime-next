const FONT = {
  XXXLARGE: 32,
  XXLARGE: 28,
  XLARGE: 24,
  LARGE: 20,
  MEDIUM: 18,
  BASE: 16,
  SMALL: 12,
  XSMALL: 10,
  TINY: 8,
} as const

const FONT_WEIGHT = {
  NORMAL: 400,
  BOLD: 600,
} as const

const COLOR = {
  PRIMARY: '#f59042',
  SYSTEM_BACKGROUND: '#fdfdfd',
  HIGHLIGHT_BACKGROUND: '#f2f0ed',
  FORM_BACKGROUND: '#f2f2f2',
  IMAGE_BACKGROUND: '#DDDDDD',
  SHADOW: '#e8e8e8',
  LABEL: '#444444',
  PLACEHOLDER: '#c7c7c7',
  STRONG_LABEL: '#000000',
  TEXT_INPUT_BORDER: '#dddddd',
  TEXT_INPUT_FOCUS_BORDER: '#f59042',
} as const

const WIDTH = {
  CONTENT_MAX: 768,
} as const

const HEIGHT = {
  HEADER: 52,
} as const

const SHADOW = {
  DEFAULT: `0px 0px 6px 3px ${COLOR.SHADOW}`,
} as const

const PADDING = {
  SIDE: 16,
} as const

const CORNER_RADIUS = {
  DEFAULT: 6,
} as const

export const StyleConst = {
  FONT,
  FONT_WEIGHT,
  COLOR,
  WIDTH,
  HEIGHT,
  SHADOW,
  PADDING,
  CORNER_RADIUS,
}
