import React from 'react';

const CustomSelect = ({ options, value, onChange,className,type}) => {
  return (
    <select value={value} onChange={onChange} type={type} className={className}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
