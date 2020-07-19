const FONT = {
  XXXLARGE: 32,
  XXLARGE: 24,
  XLARGE: 20,
  LARGE: 18,
  MEDIUM: 16,
  BASE: 14,
  SMALL: 11,
  XSMALL: 10,
  TINY: 8,
} as const

const FONT_WEIGHT = {
  NORMAL: 400,
  BOLD: 600,
} as const

const COLOR = {
  SYSTEM_BACKGROUND: '#fdfdfd',
  ACTIVE_BACKGROUND: '#fdfdfd',
  SHADOW: '#e8e8e8',
  PRIMARY: '#f59042',
  IMAGE_BACKGROUND: '#DDDDDD',
  LABEL: '#444444',
  STRONG_LABEL: '#000000',
  TEXT_INPUT_BORDER: '#dddddd',
  TEXT_INPUT_FOCUS_BORDER: '#f59042',
  FORM_BACKGROUND: '#f2f2f2',
} as const

const WIDTH = {
  CONTENT_MAX: 768
} as const

const SHADOW = {
  DEFAULT: `0px 0px 6px 3px ${COLOR.SHADOW}`
} as const

const PADDING = {
  SIDE: 16,
} as const

export default {
  FONT,
  FONT_WEIGHT,
  COLOR,
  WIDTH,
  SHADOW,
  PADDING,
}
