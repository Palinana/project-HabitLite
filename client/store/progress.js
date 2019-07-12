import axios from 'axios'
import history from '../history'

const GET_PROGRESS = 'GET_PROGRESS'

export function getProgress(progress) {
  return {type: GET_PROGRESS, progress}
}

export const fetchUserProgress = (userId, habitId, id) => {
  return dispatch => {
    axios
      .get(`/api/progress/${userId}/${habitId}/${id}`, {data: {id: id}})
      .then(res => {
        return res.data
      })
      .then(progress => {
        dispatch(getProgress(progress))
      })
      .catch(console.error)
  }
}

//REDUCER(S)
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_PROGRESS:
      return action.progress
    default:
      return state
  }
}
