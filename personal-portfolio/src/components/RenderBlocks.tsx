import React from 'react'
import { PersonalPortfolio } from '@/blocks/PersonalPortfolio/Component'
import { Portfolio } from '@/blocks/Portfolio/Component'
import type { Page } from '@/payload-types'

type BlockType = NonNullable<Page['layout']>[number]

interface RenderBlocksProps {
  blocks: BlockType[]
}

export const RenderBlocks: React.FC<RenderBlocksProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const { blockType } = block
        if (!blockType) return null

        switch (blockType) {
          case 'personalPortfolio':
            return <PersonalPortfolio key={index} {...block} />
          case 'portfolio':
            return <Portfolio key={index} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
