import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import AddReminderForm from './AddReminderForm'
import ReminderList from './ReminderList'

export default function Dashboard({ userId }) {
  const [reminders, setReminders] = useState([])
  const [filter, setFilter] = useState('all') // all | active | done

  // Real-time sync with Firestore. onSnapshot pushes updates to every
  // connected device the moment Firestore changes.
  useEffect(() => {
    const q = query(
      collection(db, 'reminders'),
      where('userId', '==', userId),
      orderBy('dueAt', 'asc'),
    )
    const unsub = onSnapshot(q, (snap) => {
      // Batch the incoming docs into a single state update so React
      // renders the list once, not once per document.
      const next = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setReminders(next)
    })
    return unsub
  }, [userId])

  const addReminder = useCallback(
    async ({ title, note, dueAt }) => {
      await addDoc(collection(db, 'reminders'), {
        userId,
        title,
        note: note || '',
        dueAt: dueAt ? new Date(dueAt).toISOString() : null,
        done: false,
        createdAt: serverTimestamp(),
      })
    },
    [userId],
  )

  const toggleDone = useCallback(async (id, done) => {
    await updateDoc(doc(db, 'reminders', id), { done: !done })
  }, [])

  const removeReminder = useCallback(async (id) => {
    await deleteDoc(doc(db, 'reminders', id))
  }, [])

  // Memoize derived values so filter/sort work doesn't re-run on every
  // unrelated parent render.
  const visibleReminders = useMemo(() => {
    if (filter === 'active') return reminders.filter((r) => !r.done)
    if (filter === 'done') return reminders.filter((r) => r.done)
    return reminders
  }, [reminders, filter])

  const counts = useMemo(
    () => ({
      total: reminders.length,
      active: reminders.filter((r) => !r.done).length,
      done: reminders.filter((r) => r.done).length,
    }),
    [reminders],
  )

  return (
    <main className="dashboard">
      <AddReminderForm onAdd={addReminder} />

      <div className="filters">
        <button
          className={filter === 'all' ? 'chip active' : 'chip'}
          onClick={() => setFilter('all')}
        >
          All ({counts.total})
        </button>
        <button
          className={filter === 'active' ? 'chip active' : 'chip'}
          onClick={() => setFilter('active')}
        >
          Active ({counts.active})
        </button>
        <button
          className={filter === 'done' ? 'chip active' : 'chip'}
          onClick={() => setFilter('done')}
        >
          Done ({counts.done})
        </button>
      </div>

      <ReminderList
        reminders={visibleReminders}
        onToggle={toggleDone}
        onDelete={removeReminder}
      />
    </main>
  )
}
