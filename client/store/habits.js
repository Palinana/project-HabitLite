import axios from 'axios'

//ACTION TYPES
const GET_USER_HABITS = 'GET_USER_HABITS'
const ADD_HABIT = 'ADD_HABIT'

//ACTION CREATORS
export function getUserHabits(allUserHabits) {
  return {type: GET_USER_HABITS, allUserHabits}
}
export function addHabit(habit) {
  return {type: ADD_HABIT, habit}
}

//THUNKS
export const fetchUserHabits = userId => {
  return dispatch => {
    axios
      .get(`/api/habits/${userId}`)
      .then(res => {
        return res.data
      })
      .then(habits => {
        dispatch(getUserHabits(habits))
      })
      .catch(console.error)
  }
}

export const postHabit = (userId, habit) => {
  return dispatch => {
    return axios
      .post(`/api/habits/${userId}`, habit)
      .then(res => {
        return res.data
      })
      .then(newHabit => {
        dispatch(addHabit(newHabit))
      })
      .catch(console.error)
  }
}

//REDUCER(S)
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_USER_HABITS:
      return action.allUserHabits
    case ADD_HABIT:
      return [...state, action.habit]
    default:
      return state
  }
}
