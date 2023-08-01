import '@testing-library/jest-dom'
import 'whatwg-fetch'

jest.mock('next/router', () => require('next-router-mock'))
