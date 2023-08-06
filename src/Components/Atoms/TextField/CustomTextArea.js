import React from 'react'

function CustomTextArea({rows,placeholder,value,onChange,disabled,cols,className}) {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      cols={cols}
      className={className}
    />
  )
}

export default CustomTextArea;