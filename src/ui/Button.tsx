import React, {ComponentProps, ForwardedRef, forwardRef} from 'react'

type Color = 'mui-blue' | 'mui-gold'
type Variant = 'solid' | 'text'
type ButtonProps = ComponentProps<'button'> & {variant?: Variant; color?: Color}

const buttonVariant: Record<Color, Record<Variant, string>> = {
  'mui-blue': {
    solid:
      'focus-visible:ring-offset-amber-50  transition bg-mui-blue-dark hover:cursor-pointer hover:ring hover:ring-amber-50 hover:ring-opacity-75 focus-visible:outline-amber-50 active:bg-mui-blue-darkest',
    text: 'focus-visible:ring-offset-amber-50 border border-transparent bg-transparent hover:ring hover:ring-amber-50 focus-visible:outline-amber-50',
  },
  'mui-gold': {
    solid:
      'focus-visible:ring-offset-amber-50  bg-mui-gold-dark hover:bg-mui-gold-light focus-visible:outline-amber-50 active:bg-mui-gold-darkest',

    text: 'focus-visible:ring-offset-amber-50 border-2 border border-mui-gold-dark hover:border-mui-gold-light hover:border-2 bg-transparent  hover:bg-mui-gold-alpha  hover:border-mui-gold-light   focus-visible:outline-amber-50',
  },
}

const Button = forwardRef(
  (
    {children, color = 'mui-blue', variant = 'solid', ...props}: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        className={`${buttonVariant[color][variant]} whitespace-nowrap rounded-lg py-2  px-10 font-bold uppercase tracking-widest  shadow shadow-mui-blue-darkest transition transition-transform  focus:outline-none focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 active:scale-90`}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
export {Button}
