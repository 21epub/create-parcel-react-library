import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

it('renders without crashing', () => {
  const wrap = render(<App />)
  expect(wrap).toBeTruthy()
})
