import { createContext, useContext } from 'react'

// True once the opening curtain has lifted. Above-the-fold animations wait for it,
// so the hero performs for the visitor instead of behind the preloader.
export const IntroContext = createContext(true)
export const useIntroDone = () => useContext(IntroContext)
