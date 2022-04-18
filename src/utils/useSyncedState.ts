import {useEffect, useState} from 'react'
import browser from 'webextension-polyfill'
import {useErrorHandler} from 'react-error-boundary'
import {MiuStorage, MiuStorageKey} from '@types'

export function useSyncedState<Key extends MiuStorageKey>(storageKey: Key) {
  const [localState, setLocalState] = useState<MiuStorage[Key] | null>(null)
  const handleError = useErrorHandler()

  useEffect(() => {
    const getStorage = async () => {
      const result = await browser.storage.sync.get(storageKey)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (result[storageKey] === undefined) {
        throw new Error(
          `StorageKey ${storageKey} should be initialazied by the background script`,
        )
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setLocalState(result[storageKey])
      }
    }

    getStorage().catch(e => handleError(e))
  }, [handleError, storageKey])

  const setState = (newState: MiuStorage[Key]) => {
    setLocalState(newState)
    browser.storage.sync.set({[storageKey]: newState})
  }

  return [localState, setState] as const
}
