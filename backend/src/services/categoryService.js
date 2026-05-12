const categoryRepository = require('../repositories/categoryRepository')

class CategoryService {
  async createCategory(userId, data) {
    const { name, type, icon } = data

    if (!name || !type) {
      throw new Error('Nombre y tipo son requeridos')
    }

    if (!['income', 'expense'].includes(type)) {
      throw new Error('Tipo inválido. Debe ser "income" o "expense"')
    }

    // Verificar si ya existe una categoría con el mismo nombre para este usuario
    const existingCategory = await categoryRepository.findByNameAndUser(name, userId)
    if (existingCategory) {
      throw new Error('Ya existe una categoría con este nombre')
    }

    const category = await categoryRepository.create({
      name,
      type,
      icon: icon || null,
      isDefault: false,
      userId
    })

    return category
  }

  async getUserCategories(userId) {
    const categories = await categoryRepository.findAllByUserId(userId)
    return categories
  }

  async updateCategory(userId, categoryId, data) {
    const { name, type, icon } = data

    const existingCategory = await categoryRepository.findById(categoryId, userId)
    if (!existingCategory) {
      throw new Error('Categoría no encontrada')
    }

    if (existingCategory.isDefault) {
      throw new Error('No se pueden editar categorías por defecto')
    }

    // Si cambia el nombre, verificar que no exista otra con el mismo nombre
    if (name && name !== existingCategory.name) {
      const duplicate = await categoryRepository.findByNameAndUser(name, userId)
      if (duplicate && duplicate.id !== categoryId) {
        throw new Error('Ya existe una categoría con este nombre')
      }
    }

    const updateData = {}
    if (name) updateData.name = name
    if (type) {
      if (!['income', 'expense'].includes(type)) {
        throw new Error('Tipo inválido. Debe ser "income" o "expense"')
      }
      updateData.type = type
    }
    if (icon !== undefined) updateData.icon = icon

    await categoryRepository.update(categoryId, userId, updateData)

    return categoryRepository.findById(categoryId, userId)
  }

  async deleteCategory(userId, categoryId) {
    const category = await categoryRepository.findById(categoryId, userId)
    if (!category) {
      throw new Error('Categoría no encontrada')
    }

    if (category.isDefault) {
      throw new Error('No se pueden eliminar categorías por defecto')
    }

    const transactionsCount = await this.getCategoryTransactionsCount(categoryId)
    if (transactionsCount > 0) {
      throw new Error(`No se puede eliminar la categoría porque tiene ${transactionsCount} transacción(es) asociada(s)`)
    }

    const result = await categoryRepository.delete(categoryId, userId)
    return result.count > 0
  }

  async getCategoryTransactionsCount(categoryId) {
    const prisma = require('../utils/prisma')
    const count = await prisma.transaction.count({
      where: { categoryId }
    })
    return count
  }

  async getDefaultCategories() {
    return [
      { name: 'Alimentos', type: 'expense', icon: '🍔' },
      { name: 'Transporte', type: 'expense', icon: '🚗' },
      { name: 'Entretenimiento', type: 'expense', icon: '🎬' },
      { name: 'Salud', type: 'expense', icon: '🏥' },
      { name: 'Educación', type: 'expense', icon: '📚' },
      { name: 'Servicios', type: 'expense', icon: '💡' },
      { name: 'Compras', type: 'expense', icon: '🛍️' },
      { name: 'Salario', type: 'income', icon: '💰' },
      { name: 'Inversiones', type: 'income', icon: '📈' },
      { name: 'Regalos', type: 'income', icon: '🎁' }
    ]
  }

  async initializeDefaultCategories(userId) {
    const defaultCategories = await this.getDefaultCategories()
    
    for (const cat of defaultCategories) {
      await categoryRepository.create({
        ...cat,
        isDefault: true,
        userId
      })
    }
  }
}

module.exports = new CategoryService()