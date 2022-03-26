import axios from 'axios'
import { useRef, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './login.css'

const Login = ({setShowLog, setUser}) => {
  const [logFailure, setLogFailure] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleLog = async (e) => {
    e.preventDefault()

    const userToLog = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    try {
      const res = await axios.post('/users/login', userToLog)
      setUser(res.data.userName)
      setShowLog(false)
    }
    catch (err) {
      console.log(err)
      setLogFailure(true)
    }
  }

  return (
    <div className="loginContainer">
      <div className="logo"/>
      <form onSubmit={handleLog}>
        <input
          type="email"
          placeholder="email"
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="password"
          ref={passwordRef}
        />
        <button type='submit'>Login</button>
      </form>
      {logFailure &&
        <span className='failure'>
          Login is failed
        </span>
      }
      <HighlightOffIcon className='cancel' onClick={() => setShowLog(false)}/>
    </div>
  )
}

export default Login
