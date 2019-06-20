import React from 'react'

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h1>{this.props.textTop}</h1>
          <p>{this.props.textBottom}</p>
        </div>
      </div>
    )
  }
}

export default Popup
