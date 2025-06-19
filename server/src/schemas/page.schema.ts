
  export function pageSchema() {
  
  
  function create() {
    return {
      type: 'object',
      properties: {
        // Ajoute ici les propriétés pour la création
      },
      required: [
        // Ajoute ici les propriétés requises pour la création
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
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
      },
      required: ['id'],
      additionalProperties: false,
    };
  }
  


  function update() {
    return {
      type: 'object',
      properties: {
        // Ajoute ici les propriétés pour la mise à jour
      },
      additionalProperties: false,
    };
  }
  


  function destroy() {
    return {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
      },
      required: ['id'],
      additionalProperties: false,
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
  
  