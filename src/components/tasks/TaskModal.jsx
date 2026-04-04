import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { PRIORITY_LEVELS } from '../../utils/constants'

const INITIAL_FORM = {
  name:     '',
  subject:  '',
  deadline: '',
  priority: 'Mittel',
}

export default function TaskModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const firstInputRef = useRef(null)

  // Lock body scroll + autofocus
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    setTimeout(() => firstInputRef.current?.focus(), 50)
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Escape key closes
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen]) // eslint-disable-line

  const handleClose = () => {
    setForm(INITIAL_FORM)
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onSubmit(form)
    setForm(INITIAL_FORM)
    onClose()
  }

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-start justify-center
                 bg-black/40 px-4 pt-20 pb-8 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="modal-body bg-white rounded-apple shadow-apple-modal w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-apple-heading">
            Aufgabe hinzufügen
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full
                       text-apple-secondary hover:text-apple-heading hover:bg-apple-bg
                       transition-colors duration-150 text-xl"
            aria-label="Schließen"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div ref={firstInputRef}>
            <Input
              label="Aufgabenname"
              id="task-name"
              value={form.name}
              onChange={set('name')}
              placeholder="z.B. Mathematik Hausaufgaben"
              required
            />
          </div>

          <Input
            label="Fach"
            id="task-subject"
            value={form.subject}
            onChange={set('subject')}
            placeholder="z.B. Mathematik"
          />

          <Input
            label="Deadline"
            id="task-deadline"
            type="date"
            value={form.deadline}
            onChange={set('deadline')}
          />

          <Input
            label="Priorität"
            id="task-priority"
            as="select"
            value={form.priority}
            onChange={set('priority')}
            options={PRIORITY_LEVELS.map((p) => ({ value: p, label: p }))}
          />

          {/* Actions */}
          <div className="flex gap-3 justify-end mt-2">
            <Button variant="ghost" onClick={handleClose} type="button">
              Abbrechen
            </Button>
            <Button variant="primary" type="submit" disabled={!form.name.trim()}>
              Hinzufügen
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}
