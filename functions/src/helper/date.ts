export class DateHelper {
  // JSTでの現在時刻
  static now(): Date {
    const currentUnixtime = new Date().getTime()
    return new Date(currentUnixtime + 9 * 60 * 60 * 1000)
  }
}
