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

export async function handleInBatch<T>(array: T[], batchSize: number, handler: (data: T[]) => Promise<any>) {
  const length = array.length

  let data: T[] = []
  for(let i = 0; i < length; i++) {
    if (data.length === batchSize) {
      await handler(data)
      data = new Array()
    }

    data.push(array[i])
  }

  if (data.length > 0) {
    await handler(data)
  }
}
