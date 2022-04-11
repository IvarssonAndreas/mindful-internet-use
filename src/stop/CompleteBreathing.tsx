import React from 'react'
import {motion} from 'framer-motion'

import {CompleteButtons} from './CompleteButtons'
import {useQuote} from './useQuote'
import {StopContentWrapper} from './StopContentWrapper'

export const CompleteBreathing = () => {
  const quote = useQuote()

  if (!quote) {
    return null
  }

  return (
    <StopContentWrapper>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.5}}
        className=" flex flex-col text-2xl leading-relaxed"
      >
        <div className="text-amber-50">{quote.qoute}</div>
        <div className="text-right text-mui-gold">{quote.author}</div>
      </motion.div>
      <CompleteButtons />
    </StopContentWrapper>
  )
}
