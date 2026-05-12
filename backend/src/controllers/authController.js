const authService = require('../services/authService')

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body
    const user = await authService.register(email, password, name)
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await authService.login(email, password)
    res.json({
      message: 'Login exitoso',
      ...result
    })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

const logout = async (req, res) => {
  try {
    const result = await authService.logout(req.token)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getMe = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const result = await authService.changePassword(
      req.user.id,
      currentPassword,
      newPassword,
      req.token
    )
    res.json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  register,
  login,
  logout,
  getMe,
  changePassword
}