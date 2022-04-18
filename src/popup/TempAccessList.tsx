import React, {useState} from 'react'
import {useInterval, useSyncedState} from '@utils'
import {TempAccess} from '@types'
import dayjs from 'dayjs'
import {TrashIcon} from '@heroicons/react/solid'

export const TempAccessList = () => {
  const [tempAccess, setTempAccess] = useSyncedState('tempAccess')

  const handleRemove = (itemToRemove: TempAccess) => {
    if (tempAccess) {
      setTempAccess(
        tempAccess.filter(
          item => item.blockPattern !== itemToRemove.blockPattern,
        ),
      )
    }
  }

  if (tempAccess === null || tempAccess.length === 0) {
    return null
  }

  return (
    <ul aria-label="Currently accessed websites" className="mt-3 space-y-2">
      {tempAccess.map(item => (
        <ListItem
          key={`${item.blockPattern}-${item.firstAccess}`}
          onRemove={() => handleRemove(item)}
          tempAccessItem={item}
        />
      ))}
    </ul>
  )
}

const ListItem = ({
  tempAccessItem,
  onRemove,
}: {
  tempAccessItem: TempAccess
  onRemove: () => void
}) => {
  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeft(tempAccessItem))

  useInterval(() => {
    const secondsLeft = getSecondsLeft(tempAccessItem)
    if (secondsLeft < 0) {
      onRemove()
    }
    setSecondsLeft(secondsLeft)
  }, 1000)

  if (secondsLeft < 0) {
    return null
  }

  const {blockPattern} = tempAccessItem
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg px-2 py-3 pl-3 text-amber-50 odd:bg-mui-blue-darkest">
      <span className="break-all text-sm">{blockPattern} </span>
      <div className=" flex items-center gap-2 text-right">
        <span className=" w-[40px] font-bold">
          {formatDuration(secondsLeft)}
        </span>
        <button
          className="rounded-2xl p-2 outline-none transition hover:cursor-pointer hover:ring hover:ring-amber-50  focus-visible:ring focus-visible:ring-amber-50 focus-visible:ring-opacity-75  "
          onClick={() => onRemove()}
          aria-label={`Remove ${blockPattern} from list`}
        >
          <TrashIcon className="h-4 w-4 text-amber-50" />
        </button>
      </div>
    </li>
  )
}

const getSecondsLeft = ({time, firstAccess}: TempAccess): number => {
  const secondsPast = dayjs().diff(firstAccess, 'seconds')
  return time * 60 - secondsPast
}

function formatDuration(durationInSeconds: number): string {
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = durationInSeconds - minutes * 60

  let output = ''
  if (minutes < 10) {
    output += `0${minutes}`
  } else {
    output += minutes
  }

  output += ':'

  if (seconds < 10) {
    output += `0${seconds}`
  } else {
    output += seconds
  }

  return output
}
