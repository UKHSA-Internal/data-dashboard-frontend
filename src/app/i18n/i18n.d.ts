declare module './i18n' {
  import { i18n, TFunction } from 'i18next';

  // initI18next function type
  export function initI18next(
    lng: string,
    ns: string | string[]
  ): Promise<i18n>;

  // getServerTranslation function type
  export function getServerTranslation(
    ns: string | string[],
    options?: {
      lng?: string;
      keyPrefix?: string;
    }
  ): Promise<{
    t: TFunction;
    i18n: i18n;
  }>;
}
