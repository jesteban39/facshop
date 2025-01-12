import lang from './locales/es.json';

export const useTranslations = (page = '') => {
  return (key: string, params: Record<string, string | number> = {}): string => {
    try {
      const strKey = page ? `${page}.${key}` : key;
      const keys = strKey.split('.');
      const value = keys.reduce((v: any, k: string) => v[k], lang);
      if (typeof value === 'object') return '';
      if (typeof value !== 'string') {
        console.warn(`useTranslations ${page}.${key}`);
        return strKey;
      }
      return Object.entries(params).reduce((value, [k, v]) => {
        return value.replace(`{${k}}`, String(v));
      }, value);
    } catch (error) {
      console.warn(`useTranslations ${page}.${key}`);
      return `${page}.${key}`;
    }
  };
};
