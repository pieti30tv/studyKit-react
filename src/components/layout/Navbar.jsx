import { useState, useEffect } from 'react'
import MobileMenu from './MobileMenu'

const NAV_ITEMS = [
  { href: '#aufgaben',  label: 'Aufgaben' },
  { href: '#timer',     label: 'Timer' },
  { href: '#statistik', label: 'Statistik' },
]

export default function Navbar() {
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState('aufgaben')

  // Sync active section from hash
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) setActiveSection(hash)
    }
    window.addEventListener('hashchange', onHashChange)
    // Set initial from hash if present
    if (window.location.hash) onHashChange()
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavigate = (section) => {
    setActiveSection(section)
    setMenuOpen(false)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <nav
        className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Hauptnavigation"
      >
        {/* Logo */}
        <a
          href="#aufgaben"
          onClick={() => handleNavigate('aufgaben')}
          className="text-[20px] font-semibold text-apple-heading tracking-tight
                     hover:opacity-80 transition-opacity duration-150"
          aria-label="StudyKit — zur Startseite"
        >
          StudyKit
        </a>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6" role="list">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => handleNavigate(item.href.slice(1))}
                  className={`text-[14px] transition-colors duration-150
                    ${isActive
                      ? 'text-apple-heading font-medium'
                      : 'text-apple-secondary hover:text-apple-heading font-normal'
                    }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Hamburger button (mobile) */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
          className="lg:hidden flex flex-col gap-[5px] justify-center items-center
                     w-11 h-11 rounded-lg -mr-2 apple-focus"
        >
          <div className={`hamburger-line ${menuOpen ? 'hamburger-open' : ''}`} />
          <div className={`hamburger-line ${menuOpen ? 'hamburger-open' : ''}`} />
          <div className={`hamburger-line ${menuOpen ? 'hamburger-open' : ''}`} />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <MobileMenu
        isOpen={menuOpen}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
    </header>
  )
}
