
  export function userSchema() {

    function login() {
      return {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            minLength: 3,
            maxLength: 30,
          },
          password: {
            type: 'string',
            minLength: 12,
            maxLength: 64
          },
        },
        required: [
          'username',
          'password'
        ],
        additionalProperties: false,
      };
    }
  
  
  function create() {
    return {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          minLength: 3,
          maxLength: 30,
        },
        email: {
          type: 'string',
          format: 'email',
        },
        password: {
          type: 'string',
          minLength: 12,
          maxLength: 64          
        },
        role:{
          type: 'string',
          enum: ['user', 'sudo'],
          default: 'user'
        }
      },
      required: [
        'username',
        'email',
        'password',
        'role'
      ],
      additionalProperties: false,
    };
  }
  


  function readAll() {
    return {
      type: 'object',
      properties: {
        // Ajoute ici les propriétés pour la lecture de tous les éléments
      },
      additionalProperties: false,
    };
  }
  


  function readById() {
    return {}
      
  }
  


  function update() {
    return {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
        username: {
          type: 'string',
          minLength: 3,
          maxLength: 30,
        },
        email: {
          type: 'string',
          format: 'email',
        },
        password: {
          type: 'string',
          minLength: 12,
          maxLength: 64          
        },
        role: {
          type: 'string',
          enum: ['user', 'sudo'],
          default: 'user'
        }
      },
      additionalProperties: false,
    };
  }
  


  function destroy() {
    return {
    };
  }
  
  
      return {
          create,
        readAll,
        readById,
        update,
        destroy,
        login
      };
  }
  
  