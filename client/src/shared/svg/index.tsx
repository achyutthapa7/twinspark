import React from 'react'
import { StyleSvgWrapper } from './style'

interface SVGProps {
  src: string
  className?: string
  title?: string
  styleSvg?: string
  onClick?: () => void
}

const Svg: React.FC<SVGProps> = ({
  src,
  className,
  title,
  styleSvg,
  onClick,
}) => {
  return (
    <StyleSvgWrapper
      styleSvg={styleSvg}
      role="img"
      aria-label={title}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: src }}
    />
  )
}

export default Svg
