import React from 'react'
import Link from 'next/link'

const links = [
  { href: '/products', label: 'Productos', icon: '' },
  { href: '/providers', label: 'Proveedores', icon: '' },
  { href: '/clients', label: 'Clientes', icon: '' },
]

const Navigation = () => {
  return (
    <nav className="fixed left-0 top-0 z-20 mx-auto flex h-[88px] w-full items-center border-b-4 border-border dark:border-darkNavBorder bg-white dark:bg-secondaryBlack px-5 m500:h-16 ">
      <div className="mx-auto flex w-[1300px] dark:text-darkText text-text max-w-full items-center justify-between">
        <div>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-base text-xl mx-4"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
