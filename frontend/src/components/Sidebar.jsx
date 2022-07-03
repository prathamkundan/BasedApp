import React from 'react'

const Sidebar = ({logo, message_head, message_body}) => {
  return (
    <div className="media-body border rounded mt-4 p-5 d-none d-lg-flex flex-column align-items-center text-center">
      <img src={logo} className="border border-secondary rounded-circle" width={150} height={150} alt='...' />
      <h2 className="mt-5">{message_head}</h2>
      <p style={{"whiteSpace": "pre-line"}}>{message_body}</p>
    </div>
  )
}

export default Sidebar