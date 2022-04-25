// Simple component to display informaton to user.

//Mui Components
import Box from '@mui/material/Box'

const Notification = ({ notify }) => {
  const { message, state } = notify
  return <Box className={state}>{message}</Box>
}

export default Notification
