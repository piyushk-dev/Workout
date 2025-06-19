import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// Recharts
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) return

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  // Chart Data
  const chartData = [
    { name: 'Load (kg)', value: workout.load },
    { name: 'Reps', value: workout.reps }
  ]

  return (
    <div className="workout-details">
      <div className="workout-header">
        <h4>{workout.title}</h4>
        <button className="delete-btn" onClick={handleClick} title="Delete workout">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
      </div>

      <div className="workout-stats">
        <div className="stat">
          <span className="stat-label">Load</span>
          <span className="stat-value">{workout.load} kg</span>
        </div>
        <div className="stat">
          <span className="stat-label">Reps</span>
          <span className="stat-value">{workout.reps}</span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: '100%', height: 150, marginTop: '10px' }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="workout-footer">
        <span className="timestamp">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
        </span>
      </div>
    </div>
  )
}

export default WorkoutDetails
