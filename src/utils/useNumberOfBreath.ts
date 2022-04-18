import {useSyncedState} from './useSyncedState'

export const useNumberOfBreath = () => {
  const [numberOfBreath] = useSyncedState('numBreath')

  return numberOfBreath
}
