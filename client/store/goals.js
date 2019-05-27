import axios from 'axios'

//ACTION TYPES
const GET_USER_GOALS = 'GET_USER_GOALS'
const ADD_GOAL = 'ADD_GOAL'

//ACTION CREATORS
export function getUserGoals(allUserGoals) {
  return {type: GET_USER_GOALS, allUserGoals}
}
export function addGoal(goal) {
  return {type: ADD_GOAL, goal}
}

//THUNKS
export const fetchUserGoals = userId => {
  return dispatch => {
    axios
      .get(`/api/goals/${userId}`)
      .then(res => {
        // console.log("Getting categories", res.data)
        return res.data
      })
      .then(goals => {
        dispatch(getUserGoals(goals))
      })
      .catch(console.error)
  }
}

export const postGoal = (userId, goal) => {
  return dispatch => {
    return axios
      .post(`/api/goals/${userId}`, goal)
      .then(res => {
        console.log('Getting goals', res.data)
        return res.data
      })
      .then(newGoal => {
        dispatch(addGoal(newGoal))
      })
      .catch(console.error)
  }
}

//REDUCER(S)
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_USER_GOALS:
      return action.allUserGoals
    case ADD_GOAL:
      return [...state, action.goal]
    default:
      return state
  }
}
