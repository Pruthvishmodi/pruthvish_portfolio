import {
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: any[]) => twMerge(clsx(inputs))

type Props = {
  data: any
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, data, ...rest } = props
  
  if (!data) return null

  return (
    <ConvertRichText
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md lg:prose-lg xl:prose-xl dark:prose-invert prose-headings:mb-2':
            enableProse,
        },
        className,
      )}
      data={data}
      {...rest}
    />
  )
}
