import { up } from "inquirer/lib/utils/readline";

  export function pageSchema() {
  
  
  function create() {
    return {
      type: 'object',
      properties: {
        titleFr: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        titleEn: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        isPublished: {
          type: 'boolean',
          default: false, 
        },
      },
      required: [
        'titleFr',
        'titleEn'
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
        titleFr: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        titleEn: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        isPublished: {
          type: 'boolean',
          default: false, 
        },
        updatedAt: {
          type: 'string',}
          ,
          createdAt: {
          type: 'string'}
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
  
  