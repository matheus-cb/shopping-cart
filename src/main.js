import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
// import { createProductElement } from './helpers/shopFunctions';

console.log(fetchProductsList('computador'));
document.querySelector('.cep-button').addEventListener('click', searchCep);
