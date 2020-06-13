import { Logging, Log } from '@google-cloud/logging'
import { LogEntry, Entry } from '@google-cloud/logging/build/src/entry'

enum LogSeverity {
  DEBUG = 100,
  INFO = 200,
  WARNING = 400,
  ERROR = 500,
  ALERT = 700,
}

// Queueにロギングしたいpayloadを貯めて、最後に一括でwriteしてみたいので一旦コレで運用してみる
export class Logger {
  private static queue: Entry[] = []
  private static log: Log = (() => {
    const logging = new Logging()
    const log = logging.log(`cloudfunctions_custom`)
    return log
  })()

  static debug(payload: any, error?: Error) {
    this.write(payload, LogSeverity.DEBUG, error)
  }

  static info(payload: any, error?: Error) {
    this.write(payload, LogSeverity.INFO, error)
  }

  static warn(payload: any, error?: Error) {
    this.write(payload, LogSeverity.WARNING, error)
  }

  static error(payload: any, error?: Error) {
    let entry = payload
    if (error) {
      entry = Object.assign(entry, { _errorMessage: error.message, stacktrace: error.stack })
    }
    this.write(entry, LogSeverity.ERROR)
  }

  static fatal(payload: any, error?: Error) {
    this.write(payload, LogSeverity.ALERT, error)
  }

  static async flush() {
    if (this.queue.length > 0) {
      await this.log.write(this.queue)
    }
  }

  private static async write(payload: any, severity: LogSeverity, error?: Error) {
    let data = payload
    if (error) {
      data = Object.assign(data, { _errorMessage: error.message, stacktrace: error.stack })
    }

    // ローカルやテスト環境の場合は即時標準出力に出す
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'test') {
      let severityText = ''
      switch (severity) {
        case LogSeverity.DEBUG:
          severityText = 'debug'
          break
        case LogSeverity.INFO:
          severityText = 'info'
          break
        case LogSeverity.WARNING:
          severityText = 'warning'
          break
        case LogSeverity.ERROR:
          severityText = 'error'
          break
        case LogSeverity.ALERT:
          severityText = 'alert'
          break
      }
      console.log(severityText, JSON.stringify(data, null, 2))
      return
    }

    if (severity === LogSeverity.DEBUG) return

    const meta = this.metadata(severity)
    const entry = this.log.entry(meta, data)
    this.queue.push(entry)
  }

  private static metadata(severity: LogSeverity): LogEntry {
    const region = process.env.FUNCTION_REGION || JSON.parse(process.env.FIREBASE_CONFIG || '{}').locationId || 'asia-northeast1'
    return {
      resource: {
        type: 'cloud_function',
        labels: {
          function_name: process.env.K_SERVICE || process.env.FUNCTION_NAME || 'no function name',
          region: region
        }
      },
      severity: severity
    }
  }
}
