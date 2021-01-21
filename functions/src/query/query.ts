export interface GraphQLQuery<T> {
  body: string
  variables?: { [key: string]: any }
  parse: (data: any) => T | null
}

export interface GraphQLResponse<T> {
  data: T
  errors?: GraphQLError[]
}

interface GraphQLError {
  message: string
}
