// Simple component to display informaton to user.

const Notification = ({ notify }) => {
  const { message, state } = notify
  return <div className={state}>{message}</div>
}

export default Notification
