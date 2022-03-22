import axios from 'axios'
import { useRef, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './register.css'

const Register = ({setShowReg}) => {
  const [regSuccess, setRegSucces] = useState(false)
  const [regFailure, setRegFailure] = useState(false)
  const emailRef = useRef()
  const usernameRef = useRef()
  const passwordRef = useRef()

  const handleReg = async (e) => {
    e.preventDefault()

    const userToCreate = {
      email: emailRef.current.value,
      userName: usernameRef.current.value,
      password: passwordRef.current.value,
    }

    try {
      await axios.post('/users/register', userToCreate)
      setRegSucces(true)
      setRegFailure(false)
    }
    catch (err) {
      console.log(err)
      setRegFailure(true)
      setRegSucces(false)
    }
  }

  return (
    <div className="registerContainer">
      <div className="logo"/>
      <form onSubmit={handleReg}>
        <input
          type="email"
          placeholder="email"
          ref={emailRef}
        />
        <input
          type="text"
          placeholder="username"
          ref={usernameRef}
        />
        <input
          type="password"
          placeholder="password"
          ref={passwordRef}
        />
        <button type='submit'>Register</button>
      </form>
      {regSuccess &&
        <span className='success'>
          Registration is successful
        </span>
      }{regFailure &&
        <span className='failure'>
          Registration is failed
        </span>
      }
      <HighlightOffIcon className='cancel' onClick={() => setShowReg(false)}/>
    </div>
  )
}

export default Register
