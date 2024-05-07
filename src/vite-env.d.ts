// https://ko.vitejs.dev/guide/env-and-mode.html
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_IS_DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
