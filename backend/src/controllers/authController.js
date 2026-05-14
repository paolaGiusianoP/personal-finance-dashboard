const authService = require('../services/authService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../utils/prisma')  

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

// Actualizar perfil
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;

    if (email && email !== req.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      if (existingUser) {
        return res.status(400).json({ error: 'El email ya está en uso' });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { 
        name: name || req.user.name,
        email: email || req.user.email
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    res.json({ 
      message: 'Perfil actualizado correctamente',
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  changePassword,
  updateProfile
}