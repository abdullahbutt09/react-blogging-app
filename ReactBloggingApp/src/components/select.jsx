import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "", //EMPTY STRING AS DEFAULT
    ...props    
} , ref) {
    const id = useId()
  return (
    <div>
      {label && <label htmlFor={id}></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-800 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${className}`}>
            {options?.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select);
