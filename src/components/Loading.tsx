import React from 'react'
import Spinner from '../assets/img/spinner.svg'

const Loading: React.FC = () => {
  return (
    <div className="content__items">
      <img
        src={Spinner}
        alt="Spinner"
        style={{
          height: '80px',
          width: '80px',
        }}
      />
    </div>
  )
}

export default Loading
