import {getModelSchemaRef} from '@loopback/openapi-v3';

export function schemaArrayOf(model: any, description: string) {
  return schemaJson(
    {type: 'array', items: getModelSchemaRef(model)},
    description,
  );
}

export function schemaJsonOf(model: any, description?: string) {
  return schemaJson(getModelSchemaRef(model), description);
}

export function schemaJson(schema: any, description?: string) {
  return {
    responses: {
      '200': {
        description,
        content: {
          'application/json': {
            schema,
          },
        },
      },
    },
  };
}
