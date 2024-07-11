import Link from 'next/link'
import { Button } from './ui/button'

export default function Header() {
  return (
    <header className='py-6'>
      <div className='container flex max-w-3xl items-center justify-between'>
        <Link href='/'>Ai Blogger</Link>
        <Button>Sign In</Button>
      </div>
    </header>
  )
}
