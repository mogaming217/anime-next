import { logger } from 'firebase-functions'

export class Logger {
  static debug(payload: any) {
    this.write(payload, 'DEBUG')
  }

  static info(payload: any) {
    this.write(payload, 'INFO')
  }

  static warn(payload: any) {
    this.write(payload, 'WARNING')
  }

  static error(payload: any, error?: Error) {
    let json = payload
    if (error) {
      json = Object.assign(json, { _errorMessage: error.message, stacktrace: error.stack })
    }
    this.write(json, 'ERROR')
  }

  static fatal(payload: any, error?: Error) {
    let json = payload
    if (error) {
      json = Object.assign(json, { _errorMessage: error.message, stacktrace: error.stack })
    }
    this.write(json, 'ALERT')
  }

  static write(payload: any, severity: logger.LogSeverity) {
    logger.write({
      severity,
      ...payload
    })
  }
}
