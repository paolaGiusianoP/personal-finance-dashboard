const prisma = require('../utils/prisma')

class SessionRepository {
  async create(data) {
    return prisma.session.create({ data })
  }

  async findByToken(token) {
    return prisma.session.findUnique({
      where: { token },
      include: { user: true }
    })
  }

  async deleteByToken(token) {
    return prisma.session.deleteMany({
      where: { token }
    })
  }

  async deleteOtherSessions(userId, currentToken) {
    return prisma.session.deleteMany({
      where: {
        userId,
        token: { not: currentToken }
      }
    })
  }
}

module.exports = new SessionRepository()