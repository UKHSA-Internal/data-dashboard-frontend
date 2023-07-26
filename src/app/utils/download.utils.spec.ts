import { downloadFile } from './download.utils'

Object.defineProperty(global, 'URL', {
  value: {
    createObjectURL: jest.fn(),
  },
  writable: true,
})

const linkMock = {
  click: jest.fn(),
}

Object.defineProperty(global.document, 'createElement', {
  value: jest.fn(() => linkMock),
  writable: true,
})

Object.defineProperty(global.document, 'body', {
  value: {
    appendChild: jest.fn(),
    removeChild: jest.fn(),
  },
  writable: true,
})

test('Downloading a file via JavaScript', () => {
  const name = 'mockFile.csv'
  const file = new Blob()

  downloadFile(name, file)

  // Create a URL from the object
  expect(global.URL.createObjectURL).toHaveBeenCalledWith(file)

  // Create an anchor element
  expect(global.document.createElement).toHaveBeenCalledWith('a')

  // Append the necessary attributes
  expect(linkMock).toEqual({
    click: expect.any(Function),
    download: 'mockFile.csv',
    href: undefined,
    target: '_blank',
  })

  // Append the link to the document
  expect(global.document.body.appendChild).toHaveBeenCalledWith(linkMock)

  // Trigger a click event on the synthetic link
  expect(linkMock.click).toHaveBeenCalled()

  // Remove the link from the document
  expect(global.document.body.removeChild).toHaveBeenCalledWith(linkMock)
})
