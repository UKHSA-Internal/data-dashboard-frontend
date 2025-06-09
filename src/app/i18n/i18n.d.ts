// Example: if your i18n.js file exports "initI18next"
declare module './i18n' {
    import { i18n, TFunction } from 'i18next';
  
    export function initI18next(
      lng: string,
      ns: string | string[]
    ): Promise<i18n>;
  
    // You can also export any other types or functions you have
  }
    export function getServerTranslation(
      ns: string | string[],
      lng?: string
    ): Promise<{ t: TFunction }>;
  
    export function getClientTranslation(
      ns: string | string[],
      lng?: string
    ): Promise<{ t: TFunction }>;
  
    export function getGlobalBanner(): Promise<{
      title: string;
      type: 'info' | 'warning' | 'error';
      body: string;
    } | null>;
