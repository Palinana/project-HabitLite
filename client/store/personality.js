import axios from 'axios'
const ADD_PERSONALITY = 'ADD_PERSONALITY'
const GET_PERSONALITY = 'GET_PERSONALITY'

const currentP = []
export function addPersonality(insight) {
  return {type: ADD_PERSONALITY, insight}
}

export function getPersonality(personality) {
  return {type: GET_PERSONALITY, personality}
}

export const postPersonality = (userId, insight) => {
  return dispatch => {
    return axios
      .put(`/api/personality/profile/${userId}`, {insight})
      .then(res => {
        console.log('POSTED SUCCESSFULLY!', res)
        dispatch(addPersonality(res.data))
      })
      .catch(err => console.log(err))
  }
}

export const fetchPersonality = userId => {
  return dispatch => {
    axios
      .get(`/api/personality/profile/${userId}`)
      .then(res => res.data)
      .then(profile => {
        dispatch(getPersonality(profile))
      })

      .catch(console.error)
  }
}

export default function reducer(state = currentP, action) {
  switch (action.type) {
    case ADD_PERSONALITY:
      return state.concat([action.insight])
    case GET_PERSONALITY:
      return action.personality
    default:
      return state
  }
}
