import { Response } from "express"

const handleError = (err: any, res: Response) => {
  res.status(400).json({
    status: 'fail',
    statusText: err.message
  })
}

export default handleError