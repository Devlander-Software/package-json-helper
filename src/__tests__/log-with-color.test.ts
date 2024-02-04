const picocolors = require('picocolors')

jest.mock('picocolors', () => ({
  blue: jest.fn().mockImplementation((msg: string) => `blue: ${msg}`),
  green: jest.fn().mockImplementation((msg: string) => `green: ${msg}`),
  red: jest.fn().mockImplementation((msg: string) => `red: ${msg}`),
  yellow: jest.fn().mockImplementation((msg: string) => `yellow: ${msg}`)
}))

describe('logWithColor', () => {
  const currentCommand = process.cwd()
  // get package to use based on the current commands path

  const pathForPackageToUse = `${currentCommand}/dist/cjs`
  console.log(pathForPackageToUse)

  const packageToUse = require(pathForPackageToUse)
  const { logColoredMessage, logError, logMessageBasedOnCondition } =
    packageToUse
  const consoleLogSpy = jest.spyOn(console, 'log')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should log green message', () => {
    logColoredMessage('Success message', 'green')
    expect(consoleLogSpy).toHaveBeenCalledWith('green: Success message')
  })

  it('should log red message', () => {
    logError('Error message')
    expect(consoleLogSpy).toHaveBeenCalledWith('red: Error message')
  })

  it('should log message based on condition', () => {
    logMessageBasedOnCondition('Conditional message', true)
    expect(consoleLogSpy).toHaveBeenCalledWith('green: Conditional message')

    logMessageBasedOnCondition('Conditional message', false)
    expect(consoleLogSpy).toHaveBeenCalledWith('red: Conditional message')
  })
})
