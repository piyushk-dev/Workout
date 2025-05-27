import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!user) {
      setError('You must be logged in')
      setIsSubmitting(false)
      return
    }

    const workout = {title, load, reps}

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
      setIsSubmitting(false)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
      setIsSubmitting(false)
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>Add a New Workout</h3>
        <p className="form-subtitle">Track your progress and stay motivated</p>
      </div>

      <div className="form-group">
        <label htmlFor="title">Exercise Title</label>
        <div className="input-wrapper">
          <input 
            id="title"
            type="text"
            placeholder="e.g. Bench Press"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
          />
          {emptyFields.includes('title') && (
            <span className="error-icon">!</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="load">Load (kg)</label>
        <div className="input-wrapper">
          <input 
            id="load"
            type="number"
            placeholder="e.g. 50"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load') ? 'error' : ''}
          />
          {emptyFields.includes('load') && (
            <span className="error-icon">!</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="reps">Reps</label>
        <div className="input-wrapper">
          <input 
            id="reps"
            type="number"
            placeholder="e.g. 12"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
          />
          {emptyFields.includes('reps') && (
            <span className="error-icon">!</span>
          )}
        </div>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <svg className="spinner" viewBox="0 0 50 50">
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
            Adding...
          </>
        ) : (
          'Add Workout'
        )}
      </button>
      
      {error && (
        <div className="error">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {error}
        </div>
      )}
    </form>
  )
}

export default WorkoutForm