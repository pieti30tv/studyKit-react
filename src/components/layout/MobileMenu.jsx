const NAV_ITEMS = [
  { href: '#aufgaben', label: 'Aufgaben' },
  { href: '#timer',    label: 'Timer' },
  { href: '#statistik',label: 'Statistik' },
]

export default function MobileMenu({ isOpen, activeSection, onNavigate }) {
  if (!isOpen) return null

  return (
    <div
      className="mobile-menu-open lg:hidden bg-white border-b border-apple-border/50
                 shadow-apple w-full absolute top-full left-0"
      role="navigation"
      aria-label="Mobile Navigation"
    >
      <ul className="flex flex-col">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.href.slice(1)
          return (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => onNavigate(item.href.slice(1))}
                className={`flex items-center px-6 text-[17px] font-medium
                  transition-colors duration-150 min-h-[52px]
                  ${isActive
                    ? 'text-apple-accent'
                    : 'text-apple-heading hover:text-apple-accent'
                  }`}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
