import lang from './locales/es.json';

export const getErrorCodes = () => {
  return Object.keys(lang.modal.errorInfo);
};
