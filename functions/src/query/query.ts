export interface GraphQLQuery<T> {
  body: string
  variables?: object
  parse: (data: any) => T | null
}

export interface GraphQLResponse<T> {
  data: T,
  errors?: GraphQLError[]
}

interface GraphQLError {
  message: string
}
