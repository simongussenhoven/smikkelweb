class AppError extends Error {
  statusCode = ''
  status = ''
  isOperational = false
  constructor(message: string, statusCode: any) {
    super(message)
    this.status = `${this.statusCode.startsWith('4') ? 'fail' : 'error'}`
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError