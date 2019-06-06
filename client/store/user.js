import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GET_USER_BY_ID = 'GET_USER_BY_ID'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = (user, levelledUp = false) => ({
  type: GET_USER,
  user,
  levelledUp
})
const getUserById = id => ({type: GET_USER_BY_ID, id})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser), false)
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data, false))
    let userId = res.data.id
    // console.log('res.data ', res.data)
    if (method === 'login') {
      history.push(`/home/users/${userId}`)
    } else {
      history.push(`/quiz/users/${userId}`)
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const fetchUserById = id => async dispatch => {
  try {
    await axios.get(`/api/users/${id}`)
    dispatch(getUserById(id))
  } catch (err) {
    console.error(err)
  }
}

export const updateUser = (habitId, incrXP = 0, HP = 0) => {
  return dispatch => {
    axios
      .put('/api/xp', {habitId, incrXP})
      .then(res => {
        dispatch(getUser(res.data.user, res.data.levelledUp))
      })
      .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...action.user,
        levelledUp: action.levelledUp
      }
    case GET_USER_BY_ID:
      return action.id
    case REMOVE_USER:
      return {}
    default:
      return state
  }
}
