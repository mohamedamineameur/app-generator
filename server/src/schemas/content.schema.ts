
  export function contentSchema() {
  
  
  function create() {
    return {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          minLength: 1},
          isPublished: {
          type: 'boolean',
          default: false, 
          }
      },
      required: [
        'content'
      ],
      additionalProperties: false,
    };
  }
  


  function readAll() {
    return {
    };
  }
  


  function readById() {
    return {
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
        content: {
          type: 'string',
          minLength: 1,
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
    return {
    };
  }
  
  
      return {
          create,
        readAll,
        readById,
        update,
        destroy
      };
  }
  
  