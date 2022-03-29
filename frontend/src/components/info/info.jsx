import { useRef, useState } from 'react'
import './info.css'

const Info = ({showMongoDB, setShowMongoDB, showMichigan, setShowMichigan}) => {

  return (
    <div className="info">
      <div className="logo" />
      <div className='checkbox'>
        <label>MongoDB</label>
        <input
          type="checkbox"
          onClick={() => setShowMongoDB(!showMongoDB)}
        />
      </div>
      <div className='checkbox'>
        <label>Michigan</label>
        <input
          type="checkbox"
          onClick={() => setShowMichigan(!showMichigan)}
        />
      </div>
    </div>
  )
}

export default Info
