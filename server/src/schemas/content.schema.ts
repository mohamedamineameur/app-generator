
  export function contentSchema() {
  
  
  function create() {
    return {
      type: 'object',
      properties: {
        contentFr: {
          type: 'string',
          minLength: 1},
          isPublished: {
          type: 'boolean',
          default: false, 
          },
        contentEn: {
          type: 'string',
          minLength: 1,
        }
      },
      required: [
        'contentFr',
        'contentEn'
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
        contentFr: {
          type: 'string',
          minLength: 1,
        },
        contentEn: {
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
  
  