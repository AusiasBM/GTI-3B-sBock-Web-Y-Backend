

# Peticiones de la API

### Para crear un nuevo usuario

    - URL:
        localhost:3000/api/login/new
    - Atributos ( En el body ):
        {
            "nombre": "Ausias",
            "email": "test1@test.com",
            "password": "123456"
        }
    - Devuelve:
        {
            "ok": true,
            "usuario": {
                "nombre": "Aitor",
                "email": "test2@test.com",
                "online": false,
                "uid": "624b0410e53bb2eb3398ad77"
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjRiMDQxMGU1M2JiMmViMzM5OGFkNzciLCJpYXQiOjE2NDkwODM0MDgsImV4cCI6MTY0OTE2OTgwOH0.Re2k2qO0pOG5_Lg6Ww-f363S8MQY_4cWjLwSKUdYmP8"
        }

    - Devuelve si esta creado:
        {
            "ok": false,
            "msg": "El correo ya está registrado"
        }
    
### Para logearse

    - URL:
        localhost:3000/api/login
    - Atributos ( En el body ):
        {
            "email": "test1@test.com",
            "password": "123456"
        }
    - Devuelve:
        {
            "ok": true,
            "usuario": {
                "nombre": "Ausias",
                "email": "test1@test.com",
                "online": false,
                "uid": "624b028045d03508ca55b24e"
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjRiMDI4MDQ1ZDAzNTA4Y2E1NWIyNGUiLCJpYXQiOjE2NDkwODMwMzEsImV4cCI6MTY0OTE2OTQzMX0.0bNvqKn6neEYcq5RmVdRDEtmUkYgF55dQoPcmeVYgpE"
        }
    - Devuelve si no esta creado:
        {
            "ok": false,
            "msg": "Email no encontrado"
        }

### Para renovar el token o sesión

    - URL:
        localhost:3000/api/login/renew
    - Atributos ( En el body ):
        {
            "nombre": "Ausias",
            "email": "test1test.com",
            "password": "123456"
        }
    - Atributos ( En el header ):
        key: x-token
        value ( Es el token que tenemos ): "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MWYyZGViNDkwZDFmMjhjMjA4M2UzZmMiLCJpYXQiOjE2NDMzMjExMTUsImV4cCI6MTY0MzQwNzUxNX0.-ICwiLNVvX-35LrAJDzfJ7wwS7NBnt_Aocxtag1z0E0"