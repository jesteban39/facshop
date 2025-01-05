import '@testing-library/jest-dom'
//import '@tests/mocks'
jest.mock('@media/icons/*.svg', () => 'svg-component')
global.console.error = jest.fn()
