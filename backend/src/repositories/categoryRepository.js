const prisma = require('../utils/prisma')

class CategoryRepository {
  async create(data) {
    return prisma.category.create({ data })
  }

  async findAllByUserId(userId) {
    return prisma.category.findMany({
      where: { 
        OR: [
          { userId },      
          { isDefault: true }  
        ]
      },
      orderBy: { name: 'asc' }
    })
  }

  async findById(id, userId) {
    return prisma.category.findFirst({
      where: { 
        id,
        OR: [
          { userId },
          { isDefault: true }
        ]
      }
    })
  }

  async update(id, userId, data) {
    return prisma.category.updateMany({
      where: { id, userId },
      data
    })
  }

  async delete(id, userId) {
    return prisma.category.deleteMany({
      where: { id, userId }
    })
  }

  async findByNameAndUser(name, userId) {
    return prisma.category.findFirst({
      where: { 
        name: { equals: name, mode: 'insensitive' },
        userId
      }
    })
  }
}

module.exports = new CategoryRepository()