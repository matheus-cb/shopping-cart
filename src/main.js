import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// cria mensagem de carregando
const loadProducts = () => {
  const sectionMain = document.querySelector('.products');
  const div = document.createElement('div');
  div.className = 'loading';
  div.innerText = 'carregando...';
  sectionMain.appendChild(div);
};

// remove mensagem de carregando
const loaded = () => {
  const divC = document.querySelector('.loading');
  divC.remove();
};

// chama as funções loadProfucts e loaded, e também mostra os produtos na tela
const displayProducts = async () => {
  loadProducts();
  // cria uma variável que contem uma lista de objetos
  const listObj = await fetchProductsList('computador');
  // seleciona o local que será o pai da lista dos produtos
  const sectionProducts = document.querySelector('.products');
  // para cada elemento da lista de obj cria uma section com descrições, img e preço do produto ...
  listObj.forEach((element) => {
    sectionProducts.appendChild(createProductElement(element));
  });
  loaded();
};

window.onload = async () => {
  await displayProducts();
};
