import * as path from 'path'
import { execSync } from 'child_process'
import { isValidAppEnv, AppEnvironment } from './helper'

const execCommand = (command: string) => {
  return execSync(command, { stdio: 'inherit' })
}

  // キーには小文字しか使用できない（Firebaseの仕様）
  // JSONは2階層までしかダメ
const generateEnvString = (env: AppEnvironment): string[] => {
  const json = require(path.resolve(__dirname, '../env', `${env}.json`))
  const envValues: string[] = []

  Object.keys(json).forEach(key => {
    const value = json[key]
    if (!value) return

    const type = typeof(value)
    if (type === 'object') {
      // 2階層目
      Object.keys(value).forEach(key2 => {
        const value2 = value[key2]
        const type2 = typeof(value2)
        if (type2 === 'string' || type2 === 'number') {
          envValues.push(`${key}.${key2}=${value2}`)
        } else {
          throw new Error('Unsupported env var type.')
        }
      })
    } else {
      throw new Error('Each env value must have a 2-part key (e.g. foo.bar)')
    }
  })

  return envValues
}

const main = async () => {
  const env = process.argv[2]
  if (!isValidAppEnv(env)) throw new Error('Invalid app env.')

  const values = generateEnvString(env)
  if (values.length === 0) throw new Error('No env vars.')

  execCommand(`firebase -P ${env} functions:config:set ${values.join(' ')}`)

  execCommand(`firebase -P ${env} functions:config:get`)
  process.exit(0)
}

main()


