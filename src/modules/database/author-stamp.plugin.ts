/* eslint-disable @typescript-eslint/no-this-alias */
function stampAuthor(requestUser: any) {
  const result = {
    id: requestUser?.id || '0',
    username: requestUser?.username || 'system'
  }

  return result
}

export const authorStampCreatePlugin = (schema) => {
  schema.pre('save', function (next) {
    const doc = this
    const requestUser = doc._requestUser
    this.updatedBy = stampAuthor(requestUser)
    if (this.isNew) {
      this.createdBy = stampAuthor(requestUser)
    }
    next()
  })

  schema.pre('findOneAndUpdate', function (next) {
    const doc = this
    const requestUser = doc._requestUser
    this.updatedBy = stampAuthor(requestUser)
    next()
  })

  schema.pre('update', function (next) {
    const doc = this
    const requestUser = doc._requestUser
    this.updatedBy = stampAuthor(requestUser)
    next()
  })

  schema.pre('updateOne', function (next) {
    const doc = this
    const requestUser = doc._requestUser
    this.updatedBy = stampAuthor(requestUser)
    next()
  })

  schema.pre('updateMany', function (next) {
    const doc = this
    const requestUser = doc._requestUser
    this.updatedBy = stampAuthor(requestUser)
    next()
  })

  schema.pre('insertMany', function (next) {
    const doc = this
    const requestUser = doc._requestUser
    this.updatedBy = stampAuthor(requestUser)
    next()
  })
}
