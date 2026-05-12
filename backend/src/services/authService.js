const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/userRepository')
const sessionRepository = require('../repositories/sessionRepository')

class AuthService {
  async register(email, password, name) {
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos')
    }

    // Verificar si el usuario ya existe
    const existingUser = await userRepository.findByEmail(email)
    if (existingUser) {
      throw new Error('El email ya está registrado')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear usuario
    const user = await userRepository.create({
      email,
      password: hashedPassword,
      name: name || null
    })

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    }
  }

  async login(email, password) {
    // Validar datos
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos')
    }

    // Buscar usuario
    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new Error('Credenciales inválidas')
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas')
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret_key_change_this',
      { expiresIn: '7d' }
    )

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    await sessionRepository.create({
      userId: user.id,
      token,
      expiresAt
    })

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }
  }

  async logout(token) {
    await sessionRepository.deleteByToken(token)
    return { message: 'Sesión cerrada exitosamente' }
  }

  async getMe(userId) {
    const user = await userRepository.findById(userId)
    if (!user) {
      throw new Error('Usuario no encontrado')
    }
    return user
  }

  async changePassword(userId, currentPassword, newPassword, currentToken) {
    if (!currentPassword || !newPassword) {
      throw new Error('Contraseñas requeridas')
    }

    const user = await userRepository.findByEmail(await this.getUserEmail(userId))
    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      throw new Error('Contraseña actual incorrecta')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Actualizar contraseña
    await userRepository.updatePassword(userId, hashedPassword)

    await sessionRepository.deleteOtherSessions(userId, currentToken)

    return { message: 'Contraseña actualizada exitosamente' }
  }

  async getUserEmail(userId) {
    const user = await userRepository.findById(userId)
    return user?.email
  }
}

module.exports = new AuthService()