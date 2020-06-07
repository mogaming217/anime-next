export interface GraphQLQuery<T> {
  body: string,
  parse: (data: any) => T | null
}

export interface GraphQLResponse<T> {
  data: T,
  errors?: GraphQLError[]
}

interface GraphQLError {
  message: string
}
