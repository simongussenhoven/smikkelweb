export const logout = (req, res) => {
  // Clear the session cookie by setting an expired date
  res.cookie('token', '', { expires: new Date(0), httpOnly: true });

  // Redirect or send a response as needed
  res.status(200).json({
    status: 'success',
    message: 'Logged out'
  })
}