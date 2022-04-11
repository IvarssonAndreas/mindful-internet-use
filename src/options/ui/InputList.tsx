import React, {
  useRef,
  useState,
  Ref,
  useEffect,
  forwardRef,
  ForwardedRef,
} from 'react'
import {Button} from '@ui'
import {LockClosedIcon, TrashIcon} from '@heroicons/react/solid'
import {Breathing} from '../../stop/Breathing'
import {Dialog} from '@headlessui/react'
import {AnimatePresence, motion} from 'framer-motion'
import {XIcon} from '@heroicons/react/outline'
import {useNumberOfBreath} from '@utils'

export interface InputListProps {
  list: string[]
  breathingRequired?: boolean
  onChange: (changedList: InputListProps['list']) => void
}

export const InputList = ({
  list,
  breathingRequired = false,
  onChange,
}: InputListProps) => {
  const [isLocked, setIsLocked] = useState(breathingRequired)
  const [itemHasBeenAdded, setItemHasBeenAdded] = useState(false)
  const listRef = useRef<HTMLUListElement | null>(null)
  const addButtonRef = useRef<HTMLButtonElement | null>(null)

  const removeItem = (indexToRemove: number) => {
    onChange(list.filter((_, index) => index !== indexToRemove))
  }

  const removeEmptyItems = () => {
    onChange(list.filter(item => Boolean(item.trim())))
    addButtonRef.current?.focus()
  }

  const updateItem = (newItem: string, indexToUpdate: number) => {
    onChange(
      list.map((item, index) => (index === indexToUpdate ? newItem : item)),
    )
  }

  const addItem = () => {
    setItemHasBeenAdded(true)
    addButtonRef.current?.focus()
    const withoutEmpty = list.filter(item => Boolean(item))
    onChange([...withoutEmpty, newItemValue])
  }

  const {
    setNewItemValue,
    setShowNewInput,
    newItemValue,
    newInputRef,
    showNewInput,
    handleNewInputBlur,
    removeNewInput,
  } = useNewInput(addItem)

  useEffect(() => {
    if (listRef.current && itemHasBeenAdded) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [itemHasBeenAdded, list])

  const showLockedOverlay = isLocked && list.length > 0
  return (
    <div>
      <div className={`${showLockedOverlay ? 'min-h-[220px]' : ''} relative `}>
        {showLockedOverlay && (
          <LockedOverlay onUnlock={() => setIsLocked(false)} />
        )}

        {list.length > 0 && (
          <ul
            ref={listRef}
            className=" mb-3 max-h-[400px] overflow-y-auto py-2 pr-2"
          >
            {list.map((item, index) => (
              <li
                key={index}
                className="rounded odd:bg-mui-blue-dark even:bg-mui-blue"
              >
                <InputRow
                  disabled={isLocked}
                  onEnter={() => removeEmptyItems()}
                  onBlur={() => removeEmptyItems()}
                  onChange={inputValue => updateItem(inputValue, index)}
                  value={item}
                  onRemoveClick={() => removeItem(index)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2 pt-2 pr-2">
        {showNewInput && (
          <InputRow
            ref={newInputRef}
            onEnter={() => handleNewInputBlur()}
            className="rounded bg-mui-blue-dark"
            onBlur={() => handleNewInputBlur()}
            onChange={inputValue => setNewItemValue(inputValue)}
            value={newItemValue}
            onRemoveClick={() => removeNewInput()}
          />
        )}
        <Button
          ref={addButtonRef}
          onClick={() => {
            setShowNewInput(true)
          }}
        >
          Add
        </Button>
      </div>
    </div>
  )
}

const LockedOverlay = ({onUnlock}: {onUnlock: () => void}) => {
  const [isUnlocking, setIsUnlocking] = useState(false)
  const numberOfBreath = useNumberOfBreath()

  return (
    <AnimatePresence>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center space-y-4 rounded-xl bg-gradient-to-tl from-mui-blue to-mui-blue-alpha p-5 text-amber-50">
        {!isUnlocking ? (
          <>
            <p className="text-center text-sm	 uppercase leading-7 tracking-wider text-mui-gold">
              Setting requires breathing <br />
              <span className=" text-sm	 text-amber-50">
                Items can still be added
              </span>
            </p>
            <LockClosedIcon className="h-20 w-20" />
            <Button onClick={() => setIsUnlocking(true)}>Unlock</Button>
          </>
        ) : (
          <Dialog
            as={motion.div}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
            open={isUnlocking}
            onClose={() => setIsUnlocking(false)}
          >
            <button
              onClick={() => setIsUnlocking(false)}
              className="absolute right-5 top-5 z-40 rounded-3xl p-4 text-amber-50 transition hover:cursor-pointer hover:ring hover:ring-amber-50   hover:ring-opacity-75 focus-visible:outline-none focus-visible:ring focus-visible:ring-amber-50 focus-visible:ring-offset-amber-50"
            >
              <XIcon className="h-8 w-8" />
            </button>
            <Dialog.Overlay className="fixed inset-0  bg-gradient-to-tr from-mui-blue-alpha to-mui-blue-dark" />
            <div className="my-8 inline-block w-full max-w-md transform  rounded-2xl  p-6 text-left align-middle  transition-all">
              {numberOfBreath && (
                <Breathing
                  onComplete={() => onUnlock()}
                  numberOfBreath={numberOfBreath}
                />
              )}
            </div>
          </Dialog>
        )}
      </div>
    </AnimatePresence>
  )
}

interface InputRowProps {
  ref?: Ref<HTMLInputElement> | null
  onBlur: () => void
  onChange: (input: string) => void
  onEnter?: () => void
  onEscape?: () => void
  value: string
  autoFocus?: boolean
  onRemoveClick: () => void
  className?: string
  disabled?: boolean
}

const InputRow = forwardRef(
  (
    {
      onEnter,
      className = '',
      autoFocus = false,
      onBlur,
      onChange,
      disabled = false,
      onRemoveClick,
      value,
    }: InputRowProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onEnter?.()
      }
    }
    return (
      <div className={`flex ${className}`}>
        <input
          disabled={disabled}
          onKeyDown={e => handleKeyDown(e)}
          ref={ref}
          autoFocus={autoFocus}
          onBlur={() => onBlur()}
          onChange={e => onChange(e.target.value)}
          type="text"
          value={value}
          className="w-full rounded-xl border-2 border-transparent bg-inherit p-2 text-amber-50 transition    focus:border-amber-50   focus:outline-none"
        />
        <button
          disabled={disabled}
          type="button"
          onClick={() => onRemoveClick()}
          className="rounded-3xl px-3 text-xl text-amber-50 outline-none transition hover:cursor-pointer hover:ring hover:ring-amber-50 hover:ring-opacity-75   focus-visible:outline-none focus-visible:ring focus-visible:ring-amber-50 focus-visible:ring-offset-amber-50"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    )
  },
)
InputRow.displayName = 'InputRow'

const useNewInput = (addItemToStorage: (itemValue: string) => void) => {
  const [showNewInput, setShowNewInput] = useState(false)
  const [newItemValue, setNewItemValue] = useState('')
  const newInputRef = useRef<HTMLInputElement | null>(null)

  const removeNewInput = () => {
    setShowNewInput(false)
    setNewItemValue('')
  }

  useEffect(() => {
    if (showNewInput) {
      newInputRef.current?.focus()
    }
  }, [showNewInput])

  const handleNewInputBlur = () => {
    if (newItemValue.trim()) {
      addItemToStorage(newItemValue)
    }

    removeNewInput()
  }

  return {
    showNewInput,
    handleNewInputBlur,
    setShowNewInput,
    setNewItemValue,
    newItemValue,
    newInputRef,
    removeNewInput,
  }
}
