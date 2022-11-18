import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createCustomElement, createProductElement } from './helpers/shopFunctions';

console.log(await fetchProductsList('computador'));
document.querySelector('.cep-button').addEventListener('click', searchCep);

// const loadProducts = () => {
//   const sectionMain = document.querySelector('.products');
//   const div = document.createElement('div');
//   div.className = 'loading';
//   div.innerText = 'carregando...';
//   // div.display = none;
//   // return console.log(div);
//   sectionMain.appendChild(div);
// };

const carregado = () => {
  const divC = document.querySelector('#loading');
  divC.remove();
  console.log(divC);
};

const displayProducts = async () => {
  // cria uma variável que contem uma lista de objetos
  const listObj = await fetchProductsList('computador');
  carregado();
  // seleciona o local que será o pai da lista dos produtos
  const sectionProducts = document.querySelector('.products');
  // para cada elemento da lista de obj cria uma section com descrições, img e preço do produto ...
  listObj.forEach((element) => {
    sectionProducts.appendChild(createProductElement(element));
  });
};

displayProducts();
// window.onload = () => {
//   // loadProducts();
// };
