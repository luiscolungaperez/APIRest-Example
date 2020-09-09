const mongoose = require('mongoose')

const connect = async (url) => {
  try {
    await mongoose.connect(url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        w: 'majority'
      })
    console.log('[db]: Conectado')
  } catch (error) {
    console.error('[db]: Error al conectarse')
  }
}

module.exports = connect
