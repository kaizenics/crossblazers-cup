'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { Container } from '@/components/ui/container'
import ShinyButton from '@/components/ui/shiny-button'
import hcdcLogo from '@/assets/logo/hcdclogo-white.png'
import { supabase } from '@/lib/supabase'

export const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  const handleHamburgerClick = () => {
    setShowSidebar(!showSidebar)
  }

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        console.error('Error fetching user:', userError)
        return
      }
  
      if (user) {
        console.log('Logged in user:', user)
        setUser(user)
      } else {
        console.log('No user is logged in.')
      }
    }
  
    getUser()
  }, [])

  const handleSectionClick = (sectionId: string | null, href: string) => {
    setShowSidebar(false)
  
    if (href.startsWith('/')) {
      router.push(href)
    } else if (pathname === '/') {
      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else {
      router.push(sectionId ? `/?section=${sectionId}` : '/')
    }
  }

  useEffect(() => {
    if (pathname === '/') {
      const urlParams = new URLSearchParams(window.location.search)
      const section = urlParams.get('section')
      if (section) {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          window.history.replaceState({}, '', '/')
        }
      }
    }
  }, [pathname])
  
  const navItems = [
    { id: null, href: '/', label: 'Home' },
    { id: 'about', href: '#about', label: 'About' },
    { id: 'null', href: '/tabulation', label: 'Tabulation' },
    { id: null, href: '/notes', label: 'Notes' },
    { id: null, href: '/events', label: 'Schedules' },
    { id: 'faq', href: '#faq', label: 'FAQ' },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-lg">
        <Container variant="fullMobileBreakpointPadded">
          <div className="flex items-center justify-between py-5">
            <Link href="/">
              <Image src={hcdcLogo} alt="HCDC Logo" width={170} height={170} className="w-auto h-8 md:h-12" />
            </Link>
            <div className="hidden md:flex items-center space-x-10">
              <div className="flex items-center space-x-5">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleSectionClick(item.id, item.href)}
                    className="font-montserrat font-semibold text-sm text-white hover:underline"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Link href="/trivia">
                  <ShinyButton text="Play Trivia Game" className="text-sm" />
                </Link>
                {user ? (
                  <Link href="/profile">
                    <button className="font-montserrat font-semibold text-sm text-black bg-white/90 rounded-sm py-2 px-5">
                      Explore
                    </button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <button className="font-montserrat font-semibold text-sm text-black bg-white/90 rounded-sm py-2 px-5">
                      Log In
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center"
              onClick={handleHamburgerClick}
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${showSidebar ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${showSidebar ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${showSidebar ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleHamburgerClick}
      ></div>
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-emerald-950 bg-opacity-95 backdrop-filter backdrop-blur-lg z-50 transform transition-transform duration-300 ease-in-out ${
          showSidebar ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6 space-y-8">
          <div className="flex justify-end">
            <button
              className="text-white"
              onClick={handleHamburgerClick}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleSectionClick(item.id, item.href)}
                className="block font-montserrat font-semibold text-lg text-white hover:text-gray-300 w-full text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <Link href="/trivia" className="block w-full">
              <ShinyButton text="Play Trivia Game" className="w-full" />
            </Link>
            {user ? (
              <Link href="/profile" className="block w-full">
                <button
                  className="w-full font-montserrat font-semibold text-sm text-black bg-white/90 rounded-sm py-2 px-5"
                  onClick={handleHamburgerClick}
                >
                  Explore
                </button>
              </Link>
            ) : (
              <Link href="/login" className="block w-full">
                <button
                  className="w-full font-montserrat font-semibold text-sm text-black bg-white/90 rounded-sm py-2 px-5"
                  onClick={handleHamburgerClick}
                >
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}