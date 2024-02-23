interface INewUserRequest {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
}

interface ILoginRequest extends Request {
  email: string,
  password: string
}