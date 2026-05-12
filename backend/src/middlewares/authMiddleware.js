const jwt = require('jsonwebtoken')
const sessionRepository = require('../repositories/sessionRepository')

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token no proporcionado' })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_change_this')

    const session = await sessionRepository.findByToken(token)

    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Sesión inválida o expirada' })
    }

    req.user = session.user
    req.token = token
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' })
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' })
    }
    console.error(error)
    res.status(500).json({ error: 'Error en autenticación' })
  }
}

module.exports = authMiddleware