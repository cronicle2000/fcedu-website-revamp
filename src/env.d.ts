/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
  readonly PUBLIC_FUNCTIONS_URL?: string; // e.g., https://<region>-<project>.cloudfunctions.net
  readonly PUBLIC_RECAPTCHA_SITE_KEY?: string;
  readonly PUBLIC_GOOGLE_MAPS_EMBED_SRC?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
