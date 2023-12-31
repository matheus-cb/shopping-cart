import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function')
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    // .toBeCalled para garantir que a mock seja chamada.
    await fetchProductsList('computador');
    expect(fetch).toBeCalled()
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    // .toBeCalledWith() para mock com argumentos específicos
    const API = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProductsList('computador');
    expect(fetch).toBeCalledWith(API)
  });

  it('Teste se o retorno da função fetchProductsList com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const expected = await fetchProductsList('computador');
    expect(expected).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: "Termo de busca não informado".', async () => {
    // .rejects para tornar o código assíncrono ainda mais expressivo
    await expect(fetchProductsList()).rejects.toThrow('Termo de busca não informado');
  });
});
