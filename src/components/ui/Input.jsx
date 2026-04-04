/**
 * Apple-style input / select / textarea.
 * Uses font-size 16px to prevent iOS Safari auto-zoom.
 */
export default function Input({
  label,
  id,
  type = 'text',
  as = 'input',
  value,
  onChange,
  placeholder,
  required = false,
  options = [],     // for as="select"
  rows = 3,         // for as="textarea"
  className = '',
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  const sharedClass =
    'w-full border border-apple-border rounded-apple-sm px-4 py-3 ' +
    'text-apple-heading placeholder-apple-secondary bg-white ' +
    'transition-colors duration-150 outline-none apple-focus ' +
    'focus:border-apple-accent focus:ring-2 focus:ring-apple-accent/20 ' +
    `${className}`

  const style = { fontSize: '16px' }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-apple-heading"
        >
          {label}
          {required && <span className="text-[#ff3b30] ml-1">*</span>}
        </label>
      )}

      {as === 'select' ? (
        <select
          id={inputId}
          value={value}
          onChange={onChange}
          required={required}
          className={sharedClass}
          style={style}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          id={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${sharedClass} resize-none`}
          style={style}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={sharedClass}
          style={style}
        />
      )}
    </div>
  )
}
