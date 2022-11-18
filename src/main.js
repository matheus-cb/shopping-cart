import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

console.log(await fetchProductsList('computador'));
document.querySelector('.cep-button').addEventListener('click', searchCep);

const displayProducts = async () => {
  // cria uma variável que contem uma lista de objetos
  const listObj = await fetchProductsList('computador');
  // seleciona o local que será o pai da lista dos produtos
  const sectionProducts = document.querySelector('.products');
  // para cada elemento da lista de obj cria uma section com descrições, img e preço do produto
  listObj.forEach((element) => {
    sectionProducts.appendChild(createProductElement(element));
  });
};

window.onload = function () {
  displayProducts();
};
