import { PRIORITY_STYLES } from '../../utils/constants'

export default function PriorityBadge({ priority }) {
  const style = PRIORITY_STYLES[priority]
  if (!style) return null

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-medium ${style.bg} ${style.text}`}
    >
      {priority}
    </span>
  )
}
