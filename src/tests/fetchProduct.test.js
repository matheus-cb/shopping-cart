import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('Teste se "fetchProduct" é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('Execute a função "fetchProduct" com o argumento do produto "MLB1405519561" e teste se fetch foi chamada', async () => {
    // .toBeCalled para garantir que a mock seja chamada.
    await fetchProduct('MLB1405519561');
    expect(fetch).toBeCalled();
  });
  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    // .toBeCalledWith() para mock com argumentos específicos
    const API = 'https://api.mercadolibre.com/items/MLB1405519561';
    await fetchProduct('MLB1405519561');
    expect(fetch).toBeCalledWith(API);
  });
  it('Teste se o retorno da função fetchProduct com o argumento do produto "MLB1405519561" é uma estrutura de dados igual ao objeto produto que já está importado no arquivo.', async () => {
    const expected = await fetchProduct('MLB1405519561');
    expect(expected).toEqual(product);
  });
  it('Teste se, ao chamar a função "fetchProduct" sem argumento, retorna um erro com a mensagem: "ID não informado"', async () => {
    // .rejects para tornar o código assíncrono ainda mais expressivo
    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
});
