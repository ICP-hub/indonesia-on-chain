import React, { useEffect, useRef } from 'react'

// eslint-disable-next-line react/prop-types
const InputNumber = ({ ...props }) => {
    const inputNumberRef = useRef()

    useEffect(() => {
        inputNumberRef.current && inputNumberRef.current.addEventListener('wheel', (e) => {
            e.preventDefault()
        })
    }, [])
    return <input type="number" ref={inputNumberRef} autoComplete='none' autoCorrect='none' {...props} />
}

export default InputNumber