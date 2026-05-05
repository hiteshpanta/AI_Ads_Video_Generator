import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function Home() {
  return (
    <div>
      <h2>Home page</h2>

      <Button>hell no</Button>
      <UserButton />
    </div>
  )
}
