import { title } from "process";

  export function albumSchema() {
  
  
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
        }
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
      type: 'object',
      properties: {
        // Ajoute ici les propriétés pour la lecture de tous les éléments
      },
      additionalProperties: false,
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
  
  