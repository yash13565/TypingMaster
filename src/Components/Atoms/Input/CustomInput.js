import React from 'react'

function CustomInput({type,min,placeholder,onChange,className,value}) {
  return (
    <input type={type} min={min} value={value} placeholder={placeholder} onChange={onChange} className={className}/>
  )
}

export default CustomInput