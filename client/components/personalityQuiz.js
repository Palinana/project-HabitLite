import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import defaultquiz from '../../script/quiz'
import {postPersonality} from '../store'
import Navigation from './layout/landing/navigation'

class PersonalityQuiz extends Component {
  state = {
    sentences: []
  }

  handleSubmit = event => {
    event.preventDefault()
    // console.log('paragraph', this.paragraph)
    const userId = this.props.match.params.id
    const insight = this.paragraph
    this.props.postNewPersonality(userId, insight)
    this.setState({sentences: []})
    this.props.history.push(`/home/users/${userId}`)
  }

  get paragraph() {
    return this.state.sentences.filter(x => x).join('. ')
  }

  handleQuestion = idx => event => {
    const sentences = [...this.state.sentences]
    sentences[idx] = event.target.value
    this.setState({sentences})
  }

  render() {
    const {quiz = defaultquiz} = this.props

    return (
      <div>
        <Navigation />
        <div className="container top-margin">
          <h1 className="form__title">
            Fill out the quiz to personalize your motivator!
          </h1>
          <form onSubmit={this.handleSubmit} className="form-container">
            {quiz.map((question, idx) => (
              <Question
                key={question.question}
                {...question}
                onChange={this.handleQuestion(idx)}
              />
            ))}
            <div className="form__box">
              <input type="submit" className="form__button" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const Question = ({question, answers, onChange}) => (
  <div className="form-row item">
    <div className="form-group form-group__select">
      <label htmlFor="disabledSelect" className="form-group__label">
        {question}:
      </label>
      <select
        id="inputState"
        className="custom-select"
        onChange={onChange}
        required
      >
        <option value="">Please select an option</option>
        {answers.map(ans => (
          <option value={question + ans.content} key={ans.content}>
            {question + ans.content}
          </option>
        ))}
      </select>
    </div>
  </div>
)

const mapState = state => {
  return {
    email: state.user.email,
    user: state.user.id,
    personality: state.personality
  }
}

const mapDispatch = dispatch => {
  return {
    postNewPersonality: (userId, insight) => {
      dispatch(postPersonality(userId, insight))
    }
  }
}

export default connect(mapState, mapDispatch)(PersonalityQuiz)

PersonalityQuiz.propTypes = {
  email: PropTypes.string
}
