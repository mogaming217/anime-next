interface ServerEnv {
  host: string
  firebase: { [key: string]: any }
}

// ブラウザから触ると落ちるようにしている
export const serverEnv: ServerEnv = (() => {
  if (process.browser) return undefined as any
  return {
    host: process.env.PUBLIC_HOST!,
    firebase: {
      project_id: process.env.PUBLIC_PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY!.replace(/\\n/g, '\n'),
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_URL,
      client_x509_cert_url: process.env.CLIENT_CERT_URL,
    },
  } as ServerEnv
})()

interface PublicEnv {
  host: string
  algolia: {
    appID: string
    searchKey: string
    indexPrefix: string
  }
}

export const publicEnv: PublicEnv = {
  host: process.env.PUBLIC_HOST!,
  algolia: {
    appID: process.env.ALGOLIA_APP_ID!,
    searchKey: process.env.ALGOLIA_SEARCH_KEY!,
    indexPrefix: process.env.ALGOLIA_INDEX_PREFIX!,
  },
}
