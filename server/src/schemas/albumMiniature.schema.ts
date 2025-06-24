
  export function albumMiniatureSchema() {
  
  
  function create() {
    return {
      type: 'object',
      properties: {
        albumId: {
          type: 'string',
          format: 'uuid',
        },
        pictureId: {
          type: 'string',
          format: 'uuid', 
        }
      },
      required: [
        'albumId',
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
        albumId: {
          type: 'string',
          format: 'uuid',
        },
        pictureId: {
          type: 'string',
          format: 'uuid', 
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
  
  