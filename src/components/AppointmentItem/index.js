import './index.css'

const AppointmentItem = props => {
  const {appointment, onToggle} = props
  
  const {id, title, date, isStar} = appointment

  const starImgUrl = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  
  const onClicked = () => {
    onToggle(id)
  }

  return (
    <li className="list-item">
      <div className="appointment-container">
        <p className="name">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={onClicked}
        >
          <img src={starImgUrl} className="star" alt="star" />
        </button>
      </div>
      <p className="date">Date:${date}</p>
    </li>
  )
}

export default AppointmentItem
