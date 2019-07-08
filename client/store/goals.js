import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_USER_GOALS = 'GET_USER_GOALS'
const ADD_GOAL = 'ADD_GOAL'

//ACTION CREATORS
export function getUserGoals(goals) {
  return {type: GET_USER_GOALS, goals}
}

export function addGoal(goal) {
  return {type: ADD_GOAL, goal}
}

//THUNKS

export const fetchUserGoals = (userId, habitId) => {
  return dispatch => {
    axios
      .get(`/api/goals/${userId}/${habitId}`)
      .then(res => {
        return res.data
      })
      .then(goals => {
        dispatch(getUserGoals(goals))
      })
      .catch(console.error)
  }
}

export const postGoal = (userId, habitId, goal) => {
  return dispatch => {
    return axios
      .post(`/api/goals/${userId}/${habitId}`, goal)
      .then(res => {
        return res.data
      })
      .then(newGoal => {
        dispatch(addGoal(newGoal))
      })
      .catch(console.error)
  }
}

export const updateGoal = (userId, habitId, goalId, checked) => {
  return function thunk(dispatch) {
    return axios
      .put(`/api/goals/${goalId}`, {checked, userId, habitId})
      .then(() => {
        return axios.get(`/api/goals/${userId}/${habitId}`)
      })
      .then(res => {
        return res.data
      })
      .then(goals => {
        dispatch(getUserGoals(goals))
      })
      .catch(console.error)
  }
}

export const resetGoals = (userId, habitId, goalId) => {
  return function thunk(dispatch) {
    return axios
      .put(`/api/goals/${userId}/${habitId}`, {goalId})
      .then(() => {
        return axios.get(`/api/goals/${userId}/${habitId}`)
      })
      .then(res => {
        return res.data
      })
      .then(goals => {
        dispatch(getUserGoals(goals))
      })
      .catch(console.error)
  }
}

export const deleteGoal = (goalId, id, userId, habitId) => {
  return function thunk(dispatch) {
    return axios
      .delete(`/api/goals/${goalId}`, {data: {id}})
      .then(() => {
        return axios.get(`/api/goals/${userId}/${habitId}`)
      })
      .then(res => {
        return res.data
      })
      .then(goals => {
        dispatch(getUserGoals(goals))
      })
      .catch(console.error)
  }
}

//REDUCER(S)
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_USER_GOALS:
      return action.goals
    case ADD_GOAL:
      return [action.goal, ...state]
    default:
      return state
  }
}
