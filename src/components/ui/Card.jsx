/**
 * Apple-style white card with 18px border-radius and subtle shadow.
 */
export default function Card({ children, className = '', onClick }) {
  return (
    <div
      className={`bg-apple-card rounded-apple shadow-apple ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
