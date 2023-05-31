import React, { Fragment } from 'react'

const CustomButton = ({ className, name, id, type, onclick}: any) => {
  return (
    <Fragment>
      <button className={className} type={type} name={id} id={id} onClick={onclick}>
        {name}
      </button>
    </Fragment>
  )
}

export default CustomButton
