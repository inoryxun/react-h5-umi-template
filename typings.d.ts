/// <reference types="vite/client" />
import 'umi/typings'

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_VERSION: string
    readonly VITE_API_BASE_URL: string
    readonly VITE_API_TIMEOUT: string
    readonly VITE_ENABLE_MOCK: string
    readonly VITE_ENABLE_VCONSOLE: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
