import { render, screen } from '@testing-library/react'
import Trend from './Trend'

test('Positive trend with an up direction', () => {
  render(<Trend colour="green" direction="up" value="5,900 (0.3%)" />)

  expect(screen.getByText('5,900 (0.3%)')).toBeInTheDocument()
  expect(screen.getByText('5,900 (0.3%)')).toHaveStyle(
    `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%23005A30' stroke-width='2' d='M6.864 14.364v-12M7.071 1.707.707 8.071M7.207 2.293l6.364 6.364'/%3E%3Cpath stroke='%23005A30' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E");`
  )
})

test('Positive trend with a down direction', () => {
  render(<Trend colour="green" direction="down" value="5,900 (0.3%)" />)

  expect(screen.getByText('5,900 (0.3%)')).toBeInTheDocument()
  expect(screen.getByText('5,900 (0.3%)')).toHaveStyle(
    `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='14' fill='none'%3E%3Cpath stroke='%23005A30' stroke-width='2' d='M8 0v12M7.793 12.657l6.364-6.364M7.657 12.071 1.293 5.707'/%3E%3Cpath stroke='%23005A30' stroke-width='1.02' d='m8.379 13.483-2.121-2.122'/%3E%3C/svg%3E");`
  )
})

test('Negative trend with an up direction', () => {
  render(<Trend colour="red" direction="up" value="185,300 (6.1%)" />)

  expect(screen.getByText('185,300 (6.1%)')).toBeInTheDocument()
  expect(screen.getByText('185,300 (6.1%)')).toHaveStyle(
    `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%23AA2A16' stroke-width='2' d='M6.864 14.364v-12M7.071 1.707.707 8.071M7.207 2.293l6.364 6.364'/%3E%3Cpath stroke='%23AA2A16' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E");`
  )
})

test('Negative trend with a down direction', () => {
  render(<Trend colour="red" direction="down" value="185,300 (6.1%)" />)

  expect(screen.getByText('185,300 (6.1%)')).toBeInTheDocument()
  expect(screen.getByText('185,300 (6.1%)')).toHaveStyle(
    `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='14' fill='none'%3E%3Cpath stroke='%23AA2A16' stroke-width='2' d='M8 0v12M7.793 12.657l6.364-6.364M7.657 12.071 1.293 5.707'/%3E%3Cpath stroke='%23AA2A16' stroke-width='1.02' d='m8.379 13.483-2.121-2.122'/%3E%3C/svg%3E");`
  )
})
