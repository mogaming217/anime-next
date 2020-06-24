export function compactMap<T, R>(array: T[], handle: (data: T) => R | null | undefined) {
  const list: R[] = []
  array.forEach(data => {
    const result = handle(data)
    if (result) {
      list.push(result)
    }
  })
  return list
}
