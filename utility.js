const Utility = {
  suffixGenerator() {
    const collection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz0123456789'
    let suffix = ''
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * collection.length)
      suffix += collection[randomIndex]
    }
    return suffix
  }
}


module.exports = Utility
