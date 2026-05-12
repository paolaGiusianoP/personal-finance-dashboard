const prisma = require('../utils/prisma')

class UserRepository {
  async create(data) {
    return prisma.user.create({ data })
  }

  async findByEmail(email) {
    return prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        createdAt: true
      }
    })
  }

  async findById(id) {
    return prisma.user.findUnique({ 
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })
  }

  async updatePassword(id, hashedPassword) {
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    })
  }
}

module.exports = new UserRepository()