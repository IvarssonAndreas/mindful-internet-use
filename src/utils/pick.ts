export function pick<Key extends string>(obj: Record<Key, any>, keys: Key[]) {
  return Object.fromEntries(
    keys.filter(key => key in obj).map(key => [key, obj[key]]),
  )
}
