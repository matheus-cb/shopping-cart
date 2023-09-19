import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// cria mensagem de carregando
const loadProducts = () => {
  const sectionMain = document.querySelector('.products');
  const messageLoad = document.createElement('h1');
  messageLoad.className = 'loading';
  messageLoad.innerText = 'carregando...';
  sectionMain.appendChild(messageLoad);
};

// remove mensagem de carregando
const loaded = () => {
  const divC = document.querySelector('.loading');
  divC.remove();
};

// chama as funções loadProfucts e loaded, e também mostra os produtos na tela
const displayProducts = async () => {
  loadProducts();
  try {
    // cria uma variável que contem uma lista de objetos
    const listObj = await fetchProductsList('computador');
    // seleciona o local que será o pai da lista dos produtos
    const sectionProducts = document.querySelector('.products');
    // para cada elemento da lista de obj cria uma section com descrições, img e preço do produto ...
    listObj.forEach((element) => {
      sectionProducts.appendChild(createProductElement(element));
    });
  } catch (error) {
    const sectionMain = document.querySelector('.products');
    const menssageError = document.createElement('h1');
    menssageError.className = 'error';
    menssageError.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    sectionMain.appendChild(menssageError);
  }
  loaded();
};

// seleciona local para os produtos
const selectSpaceCart = (product) => {
  const li = createCartProductElement(product);
  const cart = document.querySelector('.cart__products');
  return cart.appendChild(li);
};

// adiciona os produtos ao carrinho de compras e ao localStorage
const addProducts = async () => {
  // capitura os botões deixando eles em um array
  const btnProducts = document.querySelectorAll('.product__add');
  btnProducts.forEach((element, i) => {
    element.addEventListener('click', async () => {
      // capitura os prdutos deixando eles em um array
      const productId = document.querySelectorAll('.product__id');
      // saveCartId para salvar o id do produto ao localStorage
      saveCartID(productId[i].innerText);
      // capitura o id e usa a selectSpaceCart() p/ mostrar aonde vai ficar o local dos produtos
      const id = element.parentElement.firstElementChild.innerHTML;
      const product = await fetchProduct(id);
      selectSpaceCart(product);
    });
  });
};

// adiciona o produto do local storage para o carrinho
const addProductsToLS = () => {
  // capitura os id's dos produtos no localStrorage
  const productsLS = localStorage.cartProducts;
  // cria um array com os produtros do localStorage
  const arrayProducts = getSavedCartIDs(productsLS);
  arrayProducts.map(async (element) => {
    // capitura as infos dos produtros
    const productToArray = await fetchProduct(element);
    // selectSpaceCart() p/ mostrar aonde vai ficar o local dos produtos
    selectSpaceCart(productToArray);
  });
};

window.onload = async () => {
  await displayProducts();
  await addProducts();
  addProductsToLS();
};
