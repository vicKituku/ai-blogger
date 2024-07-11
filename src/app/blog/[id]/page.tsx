import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import Markdown from 'react-markdown'

import { getBlogById } from '@/lib/supabase'

export default async function Blog({ params }: { params: { id: string } }) {
  const { content, imageUrl } = await getBlogById(Number(params.id))

  return (
    <section className='mx-auto max-w-xl py-12'>
      <Link
        href='/'
        className='-nl-2 inline-flex items-center text-sm font-light text-gray-500 no-underline hover:text-gray-700'
      >
        <ChevronLeft />
        <span>Go back</span>
      </Link>
      <section className='prose mt-6'>
        <Image alt='' src={imageUrl} width={1792} height={1024} />
        <Markdown>{content}</Markdown>
      </section>
    </section>
  )
}
