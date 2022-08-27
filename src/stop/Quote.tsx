import {motion} from 'framer-motion'
import React from 'react'
import type {Quote as QuoteType} from '@types'

interface QuoteProps {
  size?: 'large' | 'small'
  quote: QuoteType
}

export const Quote = ({size = 'large', quote}: QuoteProps) => {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className={`flex flex-col leading-relaxed ${
        size === 'large' ? 'text-2xl' : 'text-s'
      }`}
    >
      <div className="text-amber-50">{quote.qoute}</div>
      <div className="text-right text-mui-gold">{quote.author}</div>
    </motion.div>
  )
}
