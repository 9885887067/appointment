import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  onChangeTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const dateTime = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: dateTime,
      isStar: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onToggle = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isStar: !each.isStar}
        }
        return each
      }),
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(each => each.isStar === true)
    }

    return appointmentsList
  }

  render() {
    const { title, date, isFilterActive} = this.state

    const filterClassName = isFilterActive ? 'filterFilled' : 'empty'

    const filterAppointmentsList = this.getFilteredAppointmentsList()
    return (
      <div className="app-container">
        <div className="container">
          <div className="appointment-container">
            <div className="form-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="appointment">Add Appointment</h1>
                <label className="label" htmlFor="title">
                  Title
                </label>
                <input
                  type="search"
                  placeholder="Title"
                  className="search"
                  onChange={this.onChangeTitle}
                  value={title}
                  id="title"
                />

                <label className="label" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  placeholder="date"
                  className="search"
                  onChange={this.onChangeDate}
                  value={date}
                  id="date"
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
            <hr className="line" />
            <div className="list">
              <p className="para">Appointments</p>
              <button
                className={`star-button ${filterClassName}`}
                type="button"
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list">
              {filterAppointmentsList.map(appointment => (
                <AppointmentItem
                  appointment={appointment}
                  key={appointment.id}
                  onToggle={this.onToggle}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
