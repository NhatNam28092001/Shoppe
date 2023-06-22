import React, { ElementType } from 'react'
import { FloatingPortal, useFloating, arrow, type Placement } from '@floating-ui/react'
import { useState, useRef, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { transform } from 'lodash'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen ,
  placement = 'bottom-end'
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, refs, floatingStyles, strategy, middlewareData } = useFloating({
    middleware: [arrow({ element: arrowRef })],
    placement: 'bottom-end'
  })
  const id = useId()
  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  return (
    <div className='flex justify-end'>
      <div className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
        {children}
        <FloatingPortal id={id}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={refs.setFloating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content'
                }}
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.2 }}
              >
                <span
                  ref={arrowRef}
                  className='absolute translate-y-[-99%] border-[-11px] border-x-transparent border-b-red-500 border-t-transparent'
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y
                  }}
                />
                {renderPopover}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </div>
    </div>
  )
}
