import React from 'react'
import Navigation from '../../components/ui/navigation'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  )
}

export default layout
