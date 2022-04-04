const mongoose = require( 'mongoose' );

const dbConnection = async() => {

    try{

        const DB = await mongoose.connect(process.env.DB_CNN);
    
        console.log("Conectado con Mongo, ", DB.connection.name);

    }catch(error){
        console.log(error);
        throw new Error('Error en la base de datos - hable con el admin');
    }

}

module.exports = dbConnection;