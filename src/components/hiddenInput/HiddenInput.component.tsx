import React from 'react'

interface VisuallyHiddenInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const VisuallyHiddenInput: React.FC<VisuallyHiddenInputProps> = ({ onChange }) => (
  <input
    type="file"
    onChange={onChange}
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      opacity: 0,
      cursor: 'pointer',
    }}
  />
)

export default VisuallyHiddenInput
