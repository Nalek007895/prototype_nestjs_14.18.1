export const errorResponse = (
  statusCode: number,
  message: string,
  path: string
) => {
  return {
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: statusCode },
        message: { type: 'string', example: message },
        path: { type: 'string', example: path },
        timestamp: { type: 'string', example: new Date().toISOString() }
      }
    }
  }
}
