import {useSyncedState} from './useSyncedState'

export const useNumberOfBreath = () => {
  const [numberOfBreath] = useSyncedState<number>('numBreath')

  return numberOfBreath
}
