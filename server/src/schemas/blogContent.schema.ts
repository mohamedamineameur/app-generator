
  export function blogContentSchema() {
  
  
  function create() {
    return {
      type: 'object',
      properties: {
        blogId: {
          type: 'string',
          format: 'uuid',
        },
        contentId: {
          type: 'string',
          format: 'uuid',
        },
        orderNumber: {
          type: 'integer',
          minimum: 1, // Minimum value for orderNumber
          default: 1, // Default value for orderNumber
        },
      },
      required: [
        'blogId',
        'contentId',
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
        blogId: {
          type: 'string',
          format: 'uuid',
        },
        contentId: {
          type: 'string',
          format: 'uuid',
        },
        orderNumber: {
          type: 'integer',
          minimum: 1, // Minimum value for orderNumber
          default: 1, // Default value for orderNumber
        },
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
  
  