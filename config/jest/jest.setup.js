import '@testing-library/jest-dom'
import 'whatwg-fetch'

/**
 * Mocking external modules and dependencies to isolate them from the tests:
 * 1. '@/lib/logger': Replaces actual logging with mock functions.
 * 2. '@/api/api-utils': Provides mock implementations for our custom fetch wrapper.
 * 3. 'next/navigation': Mocks Next.js navigation functionality.
 */
jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')
jest.mock('next/navigation')
