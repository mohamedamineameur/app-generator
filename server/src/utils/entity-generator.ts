// src/utils/entity-generator.ts

import prompts from 'prompts';
import * as fs from 'fs';
import * as path from 'path';

async function main(): Promise<void> {
  const { entityName } = await prompts({
    type: 'text',
    name: 'entityName',
    message: 'Nom de l\'entité (minuscule) :',
    validate: value => value.trim() !== '' ? true : 'Le nom est requis',
  });

  // Relations
  const relations: string[] = [];
  while (true) {
    const { hasRelation } = await prompts({
      type: 'confirm',
      name: 'hasRelation',
      message: 'Ajouter une relation ?',
      initial: false,
    });

    if (!hasRelation) break;

    const { relationName } = await prompts({
      type: 'text',
      name: 'relationName',
      message: 'Nom de la relation (minuscule) :',
      validate: value => value.trim() !== '' ? true : 'Le nom est requis',
    });

    relations.push(relationName);
  }

  // Attributs
  const attributes: { name: string; type: string }[] = [];
  const sequelizeTypes = [
    'STRING', 'TEXT', 'INTEGER', 'BIGINT', 'FLOAT', 'REAL', 'DOUBLE', 'DECIMAL',
    'DATE', 'DATEONLY', 'BOOLEAN', 'UUID', 'JSON', 'JSONB', 'ENUM', 'BLOB', 'TIME'
  ];

  while (true) {
    const { hasAttribute } = await prompts({
      type: 'confirm',
      name: 'hasAttribute',
      message: 'Ajouter un attribut ?',
      initial: true,
    });

    if (!hasAttribute) break;

    const { attributeName } = await prompts({
      type: 'text',
      name: 'attributeName',
      message: 'Nom de l\'attribut :',
      validate: value => value.trim() !== '' ? true : 'Le nom est requis',
    });

    const { attributeType } = await prompts({
      type: 'select',
      name: 'attributeType',
      message: `Type de l'attribut "${attributeName}" :`,
      choices: sequelizeTypes.map(t => ({ title: t, value: t })),
    });

    attributes.push({ name: attributeName, type: attributeType });
  }

  // Génération du fichier
  const className = capitalize(entityName);
  const filePath = path.join(__dirname, '..', 'models', `${entityName}.model.ts`);

  const content = generateModelFile(className, relations, attributes);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);

  console.log(`✅ Fichier généré : ${filePath}`);
  const crudChoices = [
    { title: 'Create (C)', value: 'C' },
    { title: 'Read all (R)', value: 'R' },
    { title: 'Read by ID (RbyID)', value: 'RbyID' },
    { title: 'Update (U)', value: 'U' },
    { title: 'Delete (D)', value: 'D' },
  ];
  
  const crudOperations: string[] = [];
  
  for (const choice of crudChoices) {
    const { include } = await prompts({
      type: 'confirm',
      name: 'include',
      message: `Voulez-vous générer "${choice.title}" ?`,
      initial: true,
    });
  
    if (include) {
      crudOperations.push(choice.value);
    }
  }
  
  await generateSchemaFileAndSave(entityName, crudOperations);
    console.log(`✅ Fichier de schéma généré pour l'entité "${entityName}"`);
    await generateControllerFileAndSave(entityName, crudOperations);    
    console.log(`✅ Fichier de contrôleur généré pour l'entité "${entityName}"`);
  await generateFixtureFileAndSave(entityName, relations);
  console.log(`✅ Fichier de fixture généré pour l'entité "${entityName}"`);
  await generateIntegrationTestFileAndSave(entityName, relations, crudOperations);
console.log(`✅ Fichier de test d'intégration généré pour l'entité "${entityName}"`);
await generateRoutesFileAndSave(entityName, crudOperations);
console.log(`✅ Fichier de routes généré pour l'entité "${entityName}"`);

updateMainRoutesFile(entityName);
console.log(`✅ Fichier main.routes.ts mis à jour pour l'entité "${entityName}"`);

await generateClientServiceFileAndSave(entityName, attributes, crudOperations);
console.log(`✅ Fichier service client généré pour l'entité "${entityName}"`);


  
  console.log('Au revoir 👋');
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateModelFile(
  className: string,
  relations: string[],
  attributes: { name: string; type: string }[]
): string {
  const relationImports = relations.map(r => `import ${capitalize(r)} from "./${r}.model";`).join('\n');

  const attributesInit = attributes.map(attr => {
    return `
    ${attr.name}: {
      type: DataTypes.${attr.type},
      allowNull: true,
    },`;
  }).join('');

  const relationAssociations = relations.map(r => {
    const relClass = capitalize(r);
    return `
${relClass}.hasMany(${className}, {
  foreignKey: "${r}Id",
  as: "${entityPluralize(className.toLowerCase())}",
});
${className}.belongsTo(${relClass}, {
  foreignKey: "${r}Id",
  as: "${r}",
});
`;
  }).join('');

  return `
import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";
${relationImports}

export class ${className} extends Model {
  public id!: number;
${relations.map(r => `  public ${r}Id!: string;`).join('\n')}
${attributes.map(attr => `  public ${attr.name}!: ${mapSequelizeTypeToTs(attr.type)};`).join('\n')}

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

${className}.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },${relations.map(r => `
    ${r}Id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ${capitalize(r)},
        key: "id",
      },
      validate: {
        notEmpty: true,
        isUUID: 4,
      },
    },`).join('')}
    ${attributesInit}
  },
  {
    sequelize,
    modelName: "${className}",
    tableName: "${className.toLowerCase()}s",
    timestamps: true,
  }
);

${relationAssociations}

export default ${className};
`;
}

function entityPluralize(str: string): string {
  // Petite pluralisation basique
  return str.endsWith('s') ? str : `${str}s`;
}

function mapSequelizeTypeToTs(type: string): string {
  switch (type) {
    case 'STRING':
    case 'TEXT':
    case 'UUID':
    case 'DATE':
    case 'DATEONLY':
    case 'TIME':
      return 'string';
    case 'INTEGER':
    case 'BIGINT':
    case 'FLOAT':
    case 'REAL':
    case 'DOUBLE':
    case 'DECIMAL':
      return 'number';
    case 'BOOLEAN':
      return 'boolean';
    case 'JSON':
    case 'JSONB':
      return 'any';
    case 'ENUM':
      return 'string'; // à ajuster
    case 'BLOB':
      return 'Buffer';
    default:
      return 'any';
  }
}

function generateSchemaFile(entityName: string, crudOperations: string[]): string {
    const className = capitalize(entityName);
  
    const crudFunctions = crudOperations.map(op => {
      switch (op) {
        case 'C': return createSchemaFunction();
        case 'R': return readAllSchemaFunction();
        case 'RbyID': return readByIdSchemaFunction();
        case 'U': return updateSchemaFunction();
        case 'D': return deleteSchemaFunction();
        default: return '';
      }
    }).join('\n\n');
  
    return `
  export function ${entityName}Schema(body: any) {
  
  ${crudFunctions}
  
      return {
  ${crudOperations.map(op => {
      const fnName = mapCrudOpToFnName(op);
      return `        ${fnName}`;
    }).join(',\n')}
      };
  }
  
  `;
  }
function mapCrudOpToFnName(op: string): string {
    switch (op) {
      case 'C': return 'create';
      case 'R': return 'readAll';
      case 'RbyID': return 'readById';
      case 'U': return 'update';
      case 'D': return 'destroy';
      default: return '';
    }
  }
function createSchemaFunction(): string {
  return `
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
  `;
}
function readAllSchemaFunction(): string {
  return `
  function readAll() {
    return {
      type: 'object',
      properties: {
        // Ajoute ici les propriétés pour la lecture de tous les éléments
      },
      additionalProperties: false,
    };
  }
  `;
}
function readByIdSchemaFunction(): string {
  return `
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
  `;
}
function updateSchemaFunction(): string {
  return `
  function update() {
    return {
      type: 'object',
      properties: {
        // Ajoute ici les propriétés pour la mise à jour
      },
      additionalProperties: false,
    };
  }
  `;
}
function deleteSchemaFunction(): string {
  return `
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
  `;
}
// Génération du fichier de schéma
async function generateSchemaFileAndSave(entityName: string, crudOperations: string[]): Promise<void> {
  const schemaContent = generateSchemaFile(entityName, crudOperations);
  const schemaFilePath = path.join(__dirname, '..', 'schemas', `${entityName}.schema.ts`);
  fs.mkdirSync(path.dirname(schemaFilePath), { recursive: true });
  fs.writeFileSync(schemaFilePath, schemaContent);
  console.log(`✅ Fichier de schéma généré : ${schemaFilePath}`);
}
function generateControllerFile(entityName: string, crudOperations: string[]): string {
    const className = capitalize(entityName);
  
    const crudFunctions = crudOperations.map(op => {
      switch (op) {
        case 'C': return generateCreateControllerFunction(entityName);
        case 'R': return generateReadAllControllerFunction(entityName);
        case 'RbyID': return generateReadByIdControllerFunction(entityName);
        case 'U': return generateUpdateControllerFunction(entityName);
        case 'D': return generateDeleteControllerFunction(entityName);
        default: return '';
      }
    }).join('\n\n');
  
    return `
  import ${className} from '../models/${entityName}.model';
  import { ${entityName}Schema } from '../schemas/${entityName}.schema';
  import { validateSchema } from '../utils/validateSchema';
  
  ${crudFunctions}
  `;
  }
  function generateCreateControllerFunction(entityName: string): string {
    return `
  export async function create${capitalize(entityName)}(req:any, res:any) {
    try {
      const schema = ${entityName}Schema(req.body).create();
      validateSchema(schema, req.body);
  
      const new${capitalize(entityName)} = await ${capitalize(entityName)}.create(req.body);
      res.status(201).json(new${capitalize(entityName)});
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }`;
  }
  
  function generateReadAllControllerFunction(entityName: string): string {
    return `
  export async function getAll${capitalize(entityName)}s(req:any, res:any) {
    try {
      const items = await ${capitalize(entityName)}.findAll();
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }`;
  }
  
  function generateReadByIdControllerFunction(entityName: string): string {
    return `
  export async function get${capitalize(entityName)}ById(req:any, res:any) {
    try {
      const schema = ${entityName}Schema(req.body).readById();
      validateSchema(schema, req.body);
  
      const item = await ${capitalize(entityName)}.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: '${capitalize(entityName)} not found' });
      }
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }`;
  }
  
  function generateUpdateControllerFunction(entityName: string): string {
    return `
  export async function update${capitalize(entityName)}(req:any, res:any) {
    try {
      const schema = ${entityName}Schema(req.body).update();
      validateSchema(schema, req.body);
  
      const item = await ${capitalize(entityName)}.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: '${capitalize(entityName)} not found' });
      }
  
      await item.update(req.body);
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }`;
  }
  
  function generateDeleteControllerFunction(entityName: string): string {
    return `
  export async function delete${capitalize(entityName)}(req:any, res:any) {
    try {
      const schema = ${entityName}Schema(req.body).destroy();
      validateSchema(schema, req.body);
  
      const item = await ${capitalize(entityName)}.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: '${capitalize(entityName)} not found' });
      }
  
      await item.destroy();
      res.status(200).json({ message: '${capitalize(entityName)} deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }`;
  }
  async function generateControllerFileAndSave(entityName: string, crudOperations: string[]): Promise<void> {
    const controllerContent = generateControllerFile(entityName, crudOperations);
    const controllerFilePath = path.join(__dirname, '..', 'controllers', `${entityName}.controller.ts`);
    fs.mkdirSync(path.dirname(controllerFilePath), { recursive: true });
    fs.writeFileSync(controllerFilePath, controllerContent);
    console.log(`✅ Fichier de contrôleur généré : ${controllerFilePath}`);
  }
      
  function generateFixtureFile(entityName: string, relations: string[]): string {
    const className = capitalize(entityName);
  
    const relationImports = relations.map(r => 
      `import { create${capitalize(r)}Fixture } from "./${r}.fixture";`
    ).join('\n');
  
    const relationOverrides = relations.map(r => `
    if (!overrides.${r}Id) {
      const ${r} = await create${capitalize(r)}Fixture();
      overrides.${r}Id = ${r}.id.toString();
    }`).join('\n');
  
    const createFields = relations.map(r => `
      ${r}Id: overrides.${r}Id,`).join('');
  
    return `
  import ${className} from "../../models/${entityName}.model";
  ${relationImports}
  
  interface ${className}Overrides {
  ${relations.map(r => `  ${r}Id?: string;`).join('\n')}
  }
  
  export const create${className}Fixture = async (overrides: ${className}Overrides = {}) => {${relationOverrides}
  
    const ${entityName} = await ${className}.create({${createFields}
    });
  
    return ${entityName};
  };
  `;
  }
  async function generateFixtureFileAndSave(entityName: string, relations: string[]): Promise<void> {
    const fixtureContent = generateFixtureFile(entityName, relations);
    const fixtureFilePath = path.join(__dirname, '..', 'specs', 'fixtures', `${entityName}.fixture.ts`);
    fs.mkdirSync(path.dirname(fixtureFilePath), { recursive: true });
    fs.writeFileSync(fixtureFilePath, fixtureContent);
    console.log(`✅ Fichier de fixture généré : ${fixtureFilePath}`);
  }

  function generateIntegrationTestFile(entityName: string, relations: string[], crudOperations: string[]): string {
    const className = capitalize(entityName);
  
    const relationImports = relations.map(r => 
      `import { create${capitalize(r)}Fixture } from "../fixtures/${r}.fixture";`
    ).join('\n');
  
    const relationDataSetup = relations.map(r => 
      `const ${r} = await create${capitalize(r)}Fixture();`
    ).join('\n    ');
  
    const relationFields = relations.map(r => 
      `${r}Id: ${r}.id.toString(),`
    ).join('\n      ');
  
    const crudTests = crudOperations.map(op => {
      switch (op) {
        case 'C': return generateCreateTest(entityName, relationDataSetup, relationFields);
        case 'R': return generateReadAllTest(entityName);
        case 'RbyID': return generateReadByIdTest(entityName);
        case 'U': return generateUpdateTest(entityName, relationDataSetup, relationFields);
        case 'D': return generateDeleteTest(entityName, relationDataSetup, relationFields);
        default: return '';
      }
    }).join('\n\n');
  
    return `
  import app from "../../server";
  import request from "supertest";
  import { preTestSetup } from "../../utils/pre-test";
  import { faker } from "@faker-js/faker";
  import { create${className}Fixture } from "../fixtures/${entityName}.fixture";
  ${relationImports}
  
  describe("${className} Routes", () => {
    ${crudTests}
  });
  `;
  }
  function generateCreateTest(entityName: string, relationDataSetup: string, relationFields: string): string {
    return `
  it("should create a new ${entityName}", async () => {
      await preTestSetup();
  
      ${relationDataSetup}
  
      const data = {
        ${relationFields}
        // Ajoute ici d'autres champs si besoin
      };
  
      const response = await request(app)
        .post("/api/${entityName}s")
        .send(data)
        .expect(201);
  
      expect(response.body).toHaveProperty("id");
      ${Object.keys(relationFields).length > 0 ? 'expect(response.body).toHaveProperty("'+relationFields.trim().split(':')[0]+'");' : ''}
  });`;
  }
  function generateReadAllTest(entityName: string): string {
    return `
  it("should get all ${entityName}s", async () => {
      await preTestSetup();
      await create${capitalize(entityName)}Fixture();
  
      const response = await request(app)
        .get("/api/${entityName}s")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
  });`;
  }
  function generateReadByIdTest(entityName: string): string {
    return `
  it("should get ${entityName} by id", async () => {
      await preTestSetup();
      const ${entityName} = await create${capitalize(entityName)}Fixture();
  
      const response = await request(app)
        .get("/api/${entityName}s/" + ${entityName}.id)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(${entityName}.id);
  });`;
  }

  function generateUpdateTest(entityName: string, relationDataSetup: string, relationFields: string): string {
    return `
  it("should update ${entityName}", async () => {
      await preTestSetup();
      const ${entityName} = await create${capitalize(entityName)}Fixture();
  
      ${relationDataSetup}
  
      const updateData = {
        id: ${entityName}.id,
        ${relationFields}
        // Ajoute ici d'autres champs modifiés
      };
  
      const response = await request(app)
        .patch("/api/${entityName}s")
        .send(updateData)
        .expect(200);
  
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(${entityName}.id);
  });`;
  }
  function generateDeleteTest(entityName: string, relationDataSetup: string, relationFields: string): string {
    return `
  it("should delete ${entityName}", async () => {
      await preTestSetup();
      const ${entityName} = await create${capitalize(entityName)}Fixture();
  
      const response = await request(app)
        .delete("/api/${entityName}s")
        .send({ id: ${entityName}.id })
        .expect(200);
  
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("${capitalize(entityName)} deleted successfully");
  });`;
  }
  async function generateIntegrationTestFileAndSave(entityName: string, relations: string[], crudOperations: string[]): Promise<void> {
    const testContent = generateIntegrationTestFile(entityName, relations, crudOperations);
    const testFilePath = path.join(__dirname, '..', 'specs', 'routes', `${entityName}.routes.test.ts`);
    fs.mkdirSync(path.dirname(testFilePath), { recursive: true });
    fs.writeFileSync(testFilePath, testContent);
    console.log(`✅ Fichier de test d'intégration généré : ${testFilePath}`);
  }

  function generateRoutesFile(entityName: string, crudOperations: string[]): string {
    const className = capitalize(entityName);
  
    const importFunctions = crudOperations.map(op => mapCrudOpToControllerFn(op, entityName)).join(',\n  ');
  
    const routesDefinitions = crudOperations.map(op => mapCrudOpToRoute(op, entityName)).join('\n');
  
    return `
  import { ${importFunctions} } from "../controllers/${entityName}.controller";
  import { Router } from "express";
  const ${entityName}Router = Router();
  
  // Routes
  ${routesDefinitions}
  
  export default ${entityName}Router;
  `;
  }
  function mapCrudOpToControllerFn(op: string, entityName: string): string {
    switch (op) {
      case 'C': return `create${capitalize(entityName)}`;
      case 'R': return `getAll${capitalize(entityName)}s`;
      case 'RbyID': return `get${capitalize(entityName)}ById`;
      case 'U': return `update${capitalize(entityName)}`;
      case 'D': return `delete${capitalize(entityName)}`;
      default: return '';
    }
  }
    
    

  function mapCrudOpToRoute(op: string, entityName: string): string {
    switch (op) {
      case 'C': return `${entityName}Router.post("/", create${capitalize(entityName)});`;
      case 'R': return `${entityName}Router.get("/", getAll${capitalize(entityName)}s);`;
      case 'RbyID': return `${entityName}Router.get("/:id", get${capitalize(entityName)}ById);`;
      case 'U': return `${entityName}Router.patch("/", update${capitalize(entityName)});`;
      case 'D': return `${entityName}Router.delete("/", delete${capitalize(entityName)});`;
      default: return '';
    }
  }
  async function generateRoutesFileAndSave(entityName: string, crudOperations: string[]): Promise<void> {
    const routesContent = generateRoutesFile(entityName, crudOperations);
    const routesFilePath = path.join(__dirname, '..', 'routes', `${entityName}.routes.ts`);
    fs.mkdirSync(path.dirname(routesFilePath), { recursive: true });
    fs.writeFileSync(routesFilePath, routesContent);
    console.log(`✅ Fichier de routes généré : ${routesFilePath}`);
  }
  function updateMainRoutesFile(entityName: string): void {
    const mainRoutesPath = path.join(__dirname, '..', 'routes', 'main.routes.ts');
    let content = fs.readFileSync(mainRoutesPath, 'utf-8');
  
    const importLine = `import ${entityName}Router from "./${entityName}.routes";`;
    const useLine = `mainRouter.use("/api/${entityName}s", ${entityName}Router);`;
  
    if (!content.includes(importLine)) {
      // Insert import after existing imports
      const importRegex = /(import .*? from .*?;\n)/g;
      const matches = content.match(importRegex);
      const lastImportIndex = matches ? content.lastIndexOf(matches[matches.length - 1]) + matches[matches.length - 1].length : 0;
      content = content.slice(0, lastImportIndex) + importLine + '\n' + content.slice(lastImportIndex);
    }
  
    if (!content.includes(useLine)) {
      // Insert before export default mainRouter
      const exportIndex = content.indexOf('export default mainRouter');
      content = content.slice(0, exportIndex) + useLine + '\n' + content.slice(exportIndex);
    }
  
    fs.writeFileSync(mainRoutesPath, content);
    console.log(`✅ Fichier main.routes.ts mis à jour avec ${entityName}Router`);
  }

  function generateClientServiceFile(entityName: string, attributes: { name: string; type: string }[], crudOperations: string[]): string {
    const className = capitalize(entityName);
    const plural = entityPluralize(entityName);
  
    const interfaceFields = [
      `id: string`,
      ...attributes.map(attr => `${attr.name}: ${mapSequelizeTypeToTs(attr.type)}`)
    ].join(';\n    ') + ';';
  
    const methods = crudOperations.map(op => {
      switch (op) {
        case 'C':
          return `
      const create${className} = async (${entityName}: Omit<${className}, "id">) => {
          return await api.post("/${plural}", ${entityName});
      };`;
        case 'R':
          return `
      const getAll${className}s = async () => {
          return await api.get("/${plural}");
      };`;
        case 'RbyID':
          return `
      const get${className}ById = async (id: string) => {
          return await api.get("/${plural}/" + id);
      };`;
        case 'U':
          return `
      const update${className} = async (id: string, ${entityName}: Omit<${className}, "id">) => {
          return await api.patch("/${plural}/" + id, ${entityName});
      };`;
        case 'D':
          return `
      const delete${className} = async (id: string) => {
          return await api.delete("/${plural}/" + id);
      };`;
        default:
          return '';
      }
    }).join('\n');
  
    const returnedFunctions = crudOperations.map(op => {
      switch (op) {
        case 'C': return `create${className}`;
        case 'R': return `getAll${className}s`;
        case 'RbyID': return `get${className}ById`;
        case 'U': return `update${className}`;
        case 'D': return `delete${className}`;
        default: return '';
      }
    }).join(',\n        ');
  
    return `import api from "./main.service";
  
  export interface ${className} {
      ${interfaceFields}
  }
  
  export function ${entityName}Service() {${methods}
  
      return {
          ${returnedFunctions}
      };
  }
  `;
  }
  async function generateClientServiceFileAndSave(entityName: string, attributes: { name: string; type: string }[], crudOperations: string[]): Promise<void> {
    const content = generateClientServiceFile(entityName, attributes, crudOperations);
    const servicePath = path.join(__dirname, '..', '..','..', 'client', 'src', 'services', `${entityName}.service.ts`);
    fs.mkdirSync(path.dirname(servicePath), { recursive: true });
    fs.writeFileSync(servicePath, content);
    console.log(`✅ Fichier client service généré : ${servicePath}`);
  }
    
      
main();
