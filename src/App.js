import { useState } from 'react';
import { initialWorkouts, generateWorkout } from './Workouts.js';
import './App.css';

function App() {
	const [workouts, setWorkouts] = useState(initialWorkouts);

	const addNewWorkout = () => {	setWorkouts([...workouts, generateWorkout()])	};

	const deleteWorkout = (targetWorkout) => {	setWorkouts(workouts.filter((workout) => workout !== targetWorkout)) };

	const completeWorkout = (targetWorkout) => { 
    const updatedWorkout = workouts.map(workout => {
      if (workout === targetWorkout) {
        return { ...workout, done: true };
      }
      return workout;
    })
    setWorkouts(updatedWorkout);
  };

  const replaceWorkout = (targetWorkout) => {
    if (!targetWorkout.done) {
      deleteWorkout(targetWorkout);
    }
    addNewWorkout()
  }

	return (
		<div className="App">
			<h1>🏋️‍♀️Workout Generator</h1>
      <div className="top-btns">
        <button id="add-workout-btn" onClick={addNewWorkout}>Add New Workout</button>
        <div id="checkbox-completed">
          <input type="checkbox" id="showCompleted" name="showCompleted"></input>
          <label for="showCompleted">Show completed workouts</label>
        </div>
      </div>
			<ul>
				{workouts.map((workout, index) => (
					<li key={index}>
						<p>
							{workout.sets}x sets of{' '}
							<strong>
								{workout.reps}x{workout.exercise}
							</strong>{' '}
							with {workout.rest} seconds rest
						</p>
						{!workout.done && (
							<button onClick={() => completeWorkout(workout)}>Done</button>
						)}
						{workout.done && <p>✅</p>}
						<button onClick={() => deleteWorkout(workout)}>Delete</button>
            {!workout.done && (<button onClick={() => replaceWorkout(workout)}>Replace {workout.exercise}</button>)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
