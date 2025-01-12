import { locales } from '../constants';
import { useLocale, useTranslations, getErrorCodes } from './index';

jest.mock('./locales/es.json', () => ({
  greeting: 'Hello, {name}',
  farewell: 'Word',
  messages: {
    farewell: 'test'
  },
  modal: {
    errorInfo: {
      generic: {}
    }
  }
}));

describe('useLocale', () => {
  it('debería retornar el primer locale', () => {
    const result = useLocale();
    expect(result).toBe(locales[0]);
  });
});

describe('useLocale', () => {
  it('debería retornar las keys de error', () => {
    const result = getErrorCodes();
    expect(result[0]).toBe('generic');
  });
});

describe('useTranslations', () => {
  it('debería retornar la traducción correcta con página', () => {
    const translate = useTranslations('messages');
    const result = translate('farewell');
    expect(result).toBe('test');
  });

  it('debería retornar la clave si no se encuentra la traducción', () => {
    const translate = useTranslations();
    const result = translate('unknownKey');
    expect(result).toBe('unknownKey');
  });

  it('debería manejar correctamente errores en el acceso a las claves', () => {
    const translate = useTranslations();
    const result = translate('non.existent.key');
    expect(result).toBe('.non.existent.key');
  });

  it('debería advertir en consola cuando no se encuentra la clave', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const translate = useTranslations();
    translate('unknownKey');
    expect(consoleWarnSpy).toHaveBeenCalledWith('useTranslations .unknownKey');
    consoleWarnSpy.mockRestore();
  });

  it("Deveria responder con '' si no es una clave final", () => {
    const translate = useTranslations('modal');
    const result = translate('errorInfo');
    expect(result).toBe('');
  });

  it('debería manejar parámetros correctamente', () => {
    const translate = useTranslations();
    const result = translate('greeting', { name: 'Juan' });
    expect(result).toBe('Hello, Juan');
  });
});
