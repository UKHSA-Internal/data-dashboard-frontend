import '@testing-library/jest-dom'
import 'whatwg-fetch'
import 'reflect-metadata'

jest.mock('next/router', () => require('next-router-mock'))
