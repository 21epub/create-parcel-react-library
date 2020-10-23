import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const wrap = render(<App />, div)
  expect(wrap).toBeTruthy()
})
