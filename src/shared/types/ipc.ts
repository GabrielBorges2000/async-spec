export interface Schema {
  name: string
  key: string
  // biome-ignore lint/suspicious/noExplicitAny:
  data: Record<string, any>[]
}

/**
 * Request
 */

export type SaveSchemaRequest = Schema

export type OnNewSchemaRequest = () => void

export interface FetchSchemaRequest {
  id: string
}

export interface DeleteSchemaRequest {
  id: string
}

/**
 * Response
 */

export interface FetchAllSchemasResponse {
  data: Schema[]
}

export interface FetchSchemaResponse {
  data: Schema
}

export interface CreateSchemaResponse {
  data: Schema
}