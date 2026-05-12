const categoryService = require('../services/categoryService')

// Obtener todas las categorías del usuario
const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getUserCategories(req.user.id)
    res.json({
      success: true,
      data: categories
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    })
  }
}

// Crear una nueva categoría
const createCategory = async (req, res) => {
  try {
    const { name, type, icon } = req.body
    const category = await categoryService.createCategory(req.user.id, {
      name,
      type,
      icon
    })
    res.status(201).json({
      success: true,
      message: 'Categoría creada exitosamente',
      data: category
    })
  } catch (error) {
    const status = error.message.includes('requeridos') || error.message.includes('inválido') ? 400 : 500
    res.status(status).json({ 
      success: false, 
      error: error.message 
    })
  }
}

// Actualizar una categoría
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { name, type, icon } = req.body
    const category = await categoryService.updateCategory(req.user.id, id, {
      name,
      type,
      icon
    })
    res.json({
      success: true,
      message: 'Categoría actualizada exitosamente',
      data: category
    })
  } catch (error) {
    const status = error.message.includes('encontrada') ? 404 : 
                   error.message.includes('No se pueden') ? 403 : 400
    res.status(status).json({ 
      success: false, 
      error: error.message 
    })
  }
}

// Eliminar una categoría
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    await categoryService.deleteCategory(req.user.id, id)
    res.json({
      success: true,
      message: 'Categoría eliminada exitosamente'
    })
  } catch (error) {
    const status = error.message.includes('encontrada') ? 404 :
                   error.message.includes('No se pueden') ? 403 :
                   error.message.includes('transacción') ? 409 : 400
    res.status(status).json({ 
      success: false, 
      error: error.message 
    })
  }
}

// Inicializar categorías por defecto 
const initializeDefaultCategories = async (req, res) => {
  try {
    await categoryService.initializeDefaultCategories(req.user.id)
    res.json({
      success: true,
      message: 'Categorías por defecto inicializadas'
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    })
  }
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  initializeDefaultCategories
}