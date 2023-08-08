import '@testing-library/jest-dom'
import 'whatwg-fetch'

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('@/lib/logger')
