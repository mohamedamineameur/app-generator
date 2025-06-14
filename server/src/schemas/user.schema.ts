
  export function userSchema(body: any) {

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
      },
      required: [
        'username',
        'email',
        'password'
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
    return {
      type: 'object',
      properties: {
       
      },
     
      additionalProperties: false,
    };
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
      },
      additionalProperties: false,
    };
  }
  


  function destroy() {
    return {
      type: 'object',
      properties: {
     
      },
      additionalProperties: false,
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
  
  