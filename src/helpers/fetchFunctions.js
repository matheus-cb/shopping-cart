export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (keyword) => {
  if (!keyword) {
    throw new Error('Termo de busca não informado');
  }

  try {
    const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${keyword}`);
    const obj = await result.json();
    const arr = obj.results;
    return arr;
  } catch (error) {
    return error.message;
  }
};
