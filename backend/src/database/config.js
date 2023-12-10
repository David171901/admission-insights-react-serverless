const mongoose = require("mongoose");

let conn = null;
const uri = process.env.DB_URI;

exports.connectDatabase = async () => {
  if (conn == null) {
    try {
      conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000
      });
      console.log('Conexión a MongoDB establecida correctamente');
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
      throw error; 
    }
  }
  return conn;
};