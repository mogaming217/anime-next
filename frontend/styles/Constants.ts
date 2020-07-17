const FONT = {
  XXXLARGE: 32,
  XXLARGE: 24,
  XLARGE: 18,
  LARGE: 16,
  MEDIUM: 14,
  BASE: 12,
  SMALL: 11,
  XSMALL: 10,
  TINY: 8,
} as const

const FONT_WEIGHT = {
  NORMAL: 400,
  BOLD: 600,
} as const

const COLOR = {
  SYSTEM_BACKGROUND: '#e8e8e8',
  ACTIVE_BACKGROUND: '#fdfdfd',
  SHADOW: '#e8e8e8',
  PRIMARY: '#f59042',
  IMAGE_BACKGROUND: '#DDDDDD',
  LABEL: '#444444',
}

const WIDTH = {
  CONTENT_MAX: 520
}

export default {
  FONT,
  FONT_WEIGHT,
  COLOR,
  WIDTH,
}
