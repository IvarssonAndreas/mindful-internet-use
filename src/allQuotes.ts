import {Quote} from '@types'

export type DefaultQuoteWithoutShow = Omit<Quote, 'show'>

export const defaultQuotes: DefaultQuoteWithoutShow[] = [
  {
    qoute: 'Wherever you are, be there totally.',
    author: 'Eckhart Tolle',
  },
  {
    qoute: "Mindfulness isn't difficult, we just need to remember to do it.",
    author: 'Sharon Salzberg',
  },
  {
    qoute:
      'Realize deeply that the present moment is all you have. Make the NOW the primary focus of your life.',
    author: 'Eckhart Tolle',
  },
  {
    qoute: 'Technology should Be Your Servant, Not Your Master',
    author: 'Ludovic Tendron',
  },
  {
    qoute: 'Distracted from distraction by distraction',
    author: 'T.S. Eliot',
  },
  {
    qoute: 'That is life: starting over, one breath at a time.',
    author: 'Sharon Salzberg',
  },
  {
    qoute: 'Mindfulness means being awake. It means knowing what you are doing',
    author: 'Jon Kabat-Zinn',
  },

  {
    qoute:
      'The difference between technology and slavery is that slaves are fully aware that they are not free',
    author: 'Nassim Nicholas Taleb',
  },
  {
    qoute: 'You may delay, but time will not',
    author: 'Benjamin Franklin',
  },
  {
    qoute:
      'What would it be like if I could accept life – accept this moment – exactly as it is?',
    author: 'Tara Brach',
  },
  {
    qoute:
      'You cannot escape the responsibility of tomorrow by evading it today',
    author: 'Abraham Lincoln',
  },
  {
    qoute: 'Until we can manage time, we can manage nothing else',
    author: 'Peter Drucker',
  },
  {
    qoute:
      'Time is at once the most valuable and the most perishable of all our possessions',
    author: 'John Randolph',
  },
  {
    qoute: 'Lost time is never found again',
    author: 'Benjamin Franklin',
  },
  {
    qoute: "You don't need a new plan for next year. You need a commitment",
    author: 'Seth Godin',
  },
  {
    qoute: 'There is no substitute for hard work',
    author: 'Thomas Edison',
  },
  {
    qoute: 'Action is the foundational key to all success',
    author: 'Pablo Picasso',
  },
  {
    qoute:
      'Only put off until tomorrow what you are willing to die having left undone',
    author: 'Pablo Picasso',
  },
  {
    qoute: 'A year from now you may wish you had started today',
    author: 'Karen Lamb',
  },
  {
    qoute: "Don't wait. The time will never be just right",
    author: 'Napoleon Hill',
  },
]
