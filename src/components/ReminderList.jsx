import { memo } from 'react'
import ReminderItem from './ReminderItem'

// memo prevents the entire list from re-rendering when a parent re-renders
// for unrelated reasons (e.g. user menu toggling). The list only re-renders
// when reminders / onToggle / onDelete change by reference.
function ReminderList({ reminders, onToggle, onDelete }) {
  if (reminders.length === 0) {
    return <p className="empty">No reminders here yet.</p>
  }

  return (
    <ul className="reminder-list">
      {reminders.map((r) => (
        <ReminderItem
          key={r.id}
          reminder={r}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default memo(ReminderList)
