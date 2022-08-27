import React, {useState} from 'react'
import {motion} from 'framer-motion'
import {StopContentWrapper} from './StopContentWrapper'
import {CompleteButtons} from './CompleteButtons'
import type {Quote as QuoteType} from '@types'

export const CopyQuote = ({quote}: {quote: QuoteType}) => {
  const [isComplete, setIsComplete] = useState(false)
  const [enteredText, setEnteredText] = useState('')
  const [isMiss, setIsMiss] = useState(false)

  const handleCopy = (newEnteredText: string) => {
    setIsMiss(false)
    const quoteText = quote.qoute

    const isCompleteMatch =
      quoteText.toLocaleLowerCase() === newEnteredText.toLocaleLowerCase()

    if (isCompleteMatch) {
      setEnteredText(quoteText)
      setIsComplete(true)
      return
    }

    const isMatchSoFar = quoteText
      .toLocaleLowerCase()
      .startsWith(newEnteredText.toLocaleLowerCase())
    const matchSoFar = quoteText.slice(0, newEnteredText.length)
    if (isMatchSoFar) {
      setEnteredText(matchSoFar)
    } else {
      setIsMiss(true)
    }
  }

  if (!quote) {
    return null
  }

  return (
    <StopContentWrapper>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.5}}
        className="  flex flex-col space-y-4  leading-relaxed "
      >
        <div className="text-sm uppercase tracking-wider text-mui-gold underline underline-offset-2">
          Copy the quote to access the site
        </div>
        <motion.div
          className="relative  text-2xl"
          onAnimationComplete={() => setIsMiss(false)}
          animate={isMiss ? {x: [15, -13, 8, -5, 2, -1, 0]} : {x: 0}}
        >
          <div className=" break-all tracking-wide opacity-30">
            {quote.qoute}
          </div>
          <div className="mt-1 text-right text-lg ">{quote.author}</div>
          <textarea
            disabled={isComplete}
            autoFocus
            onMouseOver={e => e.currentTarget.focus()}
            className="bg-ty absolute top-0  left-0 bottom-0 right-0 resize-none overflow-hidden break-all bg-transparent tracking-wide text-amber-50 focus:outline-none"
            onChange={e => handleCopy(e.target.value)}
            value={enteredText}
          />
        </motion.div>
      </motion.div>
      {isComplete && <CompleteButtons />}
    </StopContentWrapper>
  )
}
