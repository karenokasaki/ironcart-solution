// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');
  console.log(product);

  //... your code goes here
  const price = product.querySelector('.price span');
  const quantity = product.querySelector('.quantity input');
  const subtotal = product.querySelector('.subtotal span');

  console.log(price.innerText);
  console.log(quantity.value);

  subtotal.innerText = +price.innerText * +quantity.value;

  return +price.innerText * +quantity.value;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  // const singleProduct = document.querySelector('.product');

  // updateSubtotal(singleProduct);
  // end of test

  let total = 0;
  // ITERATION 2
  const allProducts = document.querySelectorAll('.product');
  for (let i = 0; i < allProducts.length; i++) {
    let product = allProducts[i];
    let subtotal = updateSubtotal(product);
    total += subtotal;
  }
  
  // ITERATION 3
  let totalSpan = document.querySelector('#total-value span');
  totalSpan.innerText = total;
}

// ITERATION 4
function removeProduct(event) {
  const target = event.currentTarget; //button clicado
  const btnParent = event.currentTarget.parentNode; //div do button
  const product = btnParent.parentNode; //row do produto inteiro
  const row = product.parentNode; //tabela inteira

  row.removeChild(product);

  //calcular o total novamente depois que um item foi apagado
  calculateAll();
}

// ITERATION 5

function createProduct(event) {
  //... your code goes here
  const productName = document.querySelector('#inputNameProduct').value;
  const productPrice = document.querySelector('#inputPriceProduct').value;

  //capturando meu tbody
  const tbody = document.querySelector('tbody');

  //criei a minha tag <tr></tr>
  const tr = document.createElement('tr'); // <tr>         </tr>
  //adicionei a classe product a minha tag
  tr.classList.add('product'); // <tr class="product">   </tr>

  //formatei a minha table row
  const row = `
    <td class="name">
      <span>${productName}</span>
    </td>
    <td class="price">$<span>${productPrice}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;

  //injetei o html do row na minha tag <tr></tr>
  tr.innerHTML = row;

  //adicionei o event listener no botão remove
  const removeBtn = tr.querySelector('.btn-remove');
  removeBtn.addEventListener('click', removeProduct);

  // adiciono a minha tr ao meu tbody
  tbody.appendChild(tr);
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');

  calculatePricesBtn.addEventListener('click', calculateAll);

  //pegando todos os buttons
  const removeBtn = document.getElementsByClassName('btn-remove');

  //iterando pelos buttons e adicionando um eventlistener em cada um
  //passando a callback removeProduct()
  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener('click', removeProduct);
  }

  //capturando o botão de criar produto!!
  const createBtn = document.querySelector('#create');
  createBtn.addEventListener('click', createProduct);
});
