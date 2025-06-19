
  export function pageContentSchema() {
  
  
  function create() {
    return {
      type: 'object',
      properties: {
        pageId: {
          type: 'string',
          format: 'uuid'
        },
        contentId: {
          type: 'string',
          format: 'uuid'
        },
        orderNumber: {
          type: 'integer',
          minimum: 1, 
          default: 1 
        }

      },
      required: [ 
        'pageId',
        'contentId'
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
        pageId: {
          type: 'string',
          format: 'uuid'
        },
        contentId: {
          type: 'string',
          format: 'uuid'
        },
        orderNumber: {
          type: 'integer',
          minimum: 1, 
          default: 1 
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
  
  