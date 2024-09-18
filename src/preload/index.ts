import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '../shared/constants/ipc'

import type {
  CreateSchemaResponse,
  DeleteSchemaRequest,
  FetchSchemaRequest,
  FetchAllSchemasResponse,
  FetchSchemaResponse,
  OnNewSchemaRequest,
  SaveSchemaRequest,
} from '../shared/types/ipc'

declare global {
  interface Window {
    api: typeof api
  }
}

const api = {
  fetchSchemas(): Promise<FetchAllSchemasResponse> {
    return ipcRenderer.invoke(IPC.SCHEMAS.FETCH_ALL)
  },

  fetchSchema(req: FetchSchemaRequest): Promise<FetchSchemaResponse> {
    return ipcRenderer.invoke(IPC.SCHEMAS.FETCH, req)
  },

  createSchema(): Promise<CreateSchemaResponse> {
    return ipcRenderer.invoke(IPC.SCHEMAS.CREATE)
  },

  saveSchema(req: SaveSchemaRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.SCHEMAS.SAVE, req)
  },

  deleteSchema(req: DeleteSchemaRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.SCHEMAS.DELETE, req)
  },

  onNewSchemaRequest(callback: OnNewSchemaRequest) {
    ipcRenderer.on('new-Schema', callback)

    return () => {
      ipcRenderer.off('new-Schema', callback)
    }
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
