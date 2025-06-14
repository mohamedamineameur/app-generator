import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv); // Ajoute ici le support des formats

interface Schema {
    [key: string]: any;
}

interface Data {
    [key: string]: any;
}

export function validateSchema(schema: Schema, data: Data): void {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        const errorMessages = validate.errors?.map(e => `${e.instancePath} ${e.message}`).join(', ');
        throw new Error(`Validation error: ${errorMessages}`);
    }
}
