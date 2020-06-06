export interface GraphQLQuery<T> {
  body: string,
  parse: (data: any) => T | null
}
