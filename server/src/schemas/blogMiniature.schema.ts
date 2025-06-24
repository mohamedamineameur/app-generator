
  export function blogMiniatureSchema() {
  
  
  function create() {
    return {
      type: 'object',
      properties: {
        blogId: {
          type: 'string',
          format: 'uuid',
        },
        pictureId: {
          type: 'string',
          format: 'uuid', 
        },
      },
      required: [
        'blogId',
        'pictureId'
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
        pictureId: {
          type: 'string',
          format: 'uuid', 
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
  
  