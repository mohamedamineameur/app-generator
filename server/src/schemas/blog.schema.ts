
  export function blogSchema() {
  
  
  function create() {
    return {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        isPublished: {
          type: 'boolean',
          default: false, 
        }
      },
      required: [
        'title'
      ],
      additionalProperties: false,
    };
  }
  


  function readAll() {
    return 
  }
  


  function readById() {
    return 
  }
  


  function update() {
    return {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
        title: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        isPublished: {
          type: 'boolean',
          default: false, 
        }
      },
      additionalProperties: false,
    };
  }
  


  function destroy() {
    return
  }
  
  
      return {
          create,
        readAll,
        readById,
        update,
        destroy
      };
  }
  
  