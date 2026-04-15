import { memo, useMemo } from 'react'

function formatDue(iso) {
  if (!iso) return null
  const d = new Date(iso)
  const now = new Date()
  const sameDay = d.toDateString() === now.toDateString()
  const opts = sameDay
    ? { hour: 'numeric', minute: '2-digit' }
    : { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }
  return d.toLocaleString(undefined, opts)
}

// memo so unaffected rows don't re-render when one row toggles.
// With stable onToggle / onDelete refs (useCallback in parent), this makes
// toggling one reminder in a list of 50 touch only that one row.
function ReminderItem({ reminder, onToggle, onDelete }) {
  const dueLabel = useMemo(() => formatDue(reminder.dueAt), [reminder.dueAt])

  const overdue = useMemo(() => {
    if (!reminder.dueAt || reminder.done) return false
    return new Date(reminder.dueAt).getTime() < Date.now()
  }, [reminder.dueAt, reminder.done])

  return (
    <li className={`reminder-item${reminder.done ? ' done' : ''}`}>
      <input
        type="checkbox"
        checked={!!reminder.done}
        onChange={() => onToggle(reminder.id, reminder.done)}
        aria-label={`Mark ${reminder.title} as ${reminder.done ? 'not done' : 'done'}`}
      />
      <div className="reminder-body">
        <div className="reminder-title">{reminder.title}</div>
        {reminder.note && <div className="reminder-note">{reminder.note}</div>}
        {dueLabel && (
          <div className={overdue ? 'reminder-due overdue' : 'reminder-due'}>
            {overdue ? 'Overdue · ' : ''}
            {dueLabel}
          </div>
        )}
      </div>
      <button
        className="ghost danger"
        onClick={() => onDelete(reminder.id)}
        aria-label={`Delete ${reminder.title}`}
      >
        ✕
      </button>
    </li>
  )
}

export default memo(ReminderItem)
