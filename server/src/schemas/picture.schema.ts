import { url } from "inspector";

  export function pictureSchema() {
  
  
  function create() {
    return {
      type: 'object',
      properties: {
       
        description: {
          type: 'string',
          maxLength: 500,
        },
        albumId: {
          type: 'string',
          format: 'uuid',
        },
        isPublished: {
          type: 'boolean',
          default: false,
        }
      },
      required: [
        
        'albumId',
        'description'
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
        url: {
          type: 'string',
          format: 'uri',
        },
        description: {
          type: 'string',
          maxLength: 500,
        },
        albumId: {
          type: 'string',
          format: 'uuid',
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
  
  