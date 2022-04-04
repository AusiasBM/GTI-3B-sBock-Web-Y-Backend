const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({


    nombre: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    online: {
        type: Boolean,
        default: false
    }


});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object} = this.toObject(); // Lo que hacemos es decirle que no envie el __v, _id, password y que todo los otro lo guarde en object ( a object le podemos poner el nombre que queramos )
    object.uid = _id; // Estamos añadiendo un atributo a object con el nombre uid y que contiene el valor de _id ( de esta forma estamos cambiando el nombre de _id a uid )
    return object; // Devolvemos el object que ahora ja tiene la información como nostros queremos.
});

module.exports = model('Usuario', UsuarioSchema);

