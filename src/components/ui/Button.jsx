/**
 * Apple-style button.
 * variant: 'primary' | 'secondary' | 'ghost' | 'danger'
 * size: 'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  fullWidth = false,
}) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-apple-pill ' +
    'transition-all duration-150 ease-out select-none apple-focus ' +
    'active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none'

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-5 py-2.5 text-[15px] min-h-[44px]',
    lg: 'px-7 py-3.5 text-base min-h-[50px]',
  }

  const variants = {
    primary:
      'bg-apple-accent text-white hover:bg-[#0055b3]',
    secondary:
      'bg-white border border-apple-border text-apple-heading hover:bg-apple-bg',
    ghost:
      'text-apple-accent hover:text-[#0055b3] hover:bg-apple-bg',
    danger:
      'bg-[#ff3b30] text-white hover:bg-[#d63029]',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
