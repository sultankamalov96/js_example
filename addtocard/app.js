let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let modal = document.querySelector('.modal');


openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Салат',
        image: '1.PNG',
        component: 'ПРОДУКТ 1 состав',
        price: 250,
        categories : 'салат'
    },
    {
        id: 2,
        name: 'Курица',
        image: '2.PNG',
        component: 'ПРОДУКТ 2 состав',
        price: 250
    },
    {
        id: 3,
        name: 'Рыба',
        image: '3.PNG',
        component: 'ПРОДУКТ 3 состав',
        price: 350
    },
    {
        id: 4,
        name: 'Суп',
        image: '4.PNG',
        component: 'ПРОДУКТ 4 состав',
        price: 260
    },
    {
        id: 5,
        name: 'Салат',
        image: '5.PNG',
        component: 'ПРОДУКТ 5 состав',
        price: 400
    },
    {
        id: 6,
        name: 'Пицца',
        image: '6.PNG',
        component: 'ПРОДУКТ 6 состав',
        price: 500
    }
];

let listCards = []

// жаны

let listSearch = [...products]
const initApp = () => {
    if (listSearch.length < 1) {
        list.innerHTML = `<h3>Товар не найден!!!</h3>`;
        return;
    }
    list.innerHTML = listSearch
        .map((product, key) => {
            return ` <div class="item">
            <img onclick="keyModalOpen(${key})" src="image/${product.image}">
            <div class="title">${product.name}</div>
            <div class="price">${product.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Купить</button>
      </div>`;
        })
        .join('');
};
initApp();
const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');
form.addEventListener('keyup', () => {
    const inputValue = searchInput.value;
    listSearch = products.filter((product) => {
        return product.name.toLowerCase().includes(inputValue);
    });
    initApp();
});


// эски
//let listCards  = [];
// function initApp(){
//     products.forEach((value, key) =>{
//         let newDiv = document.createElement('div');
//         newDiv.classList.add('item');
//         newDiv.innerHTML = `
//             <img onclick="keyModalOpen(${key})" src="image/${value.image}">
//             <div class="title">${value.name}</div>
//             <div class="price">${value.price.toLocaleString()}</div>
//             <button onclick="addToCard(${key})">Купить</button>`;
//         list.appendChild(newDiv);
//     })
// }
// initApp();

function addToCard(key) {
  if (listCards[key] == null) {
      listCards[key] = JSON.parse(JSON.stringify(products[key]));
      listCards[key].quantity = 1;
      console.log(listCards[key])
  }
  reloadCard();

}
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

let listModal = [];
function openModal() {
    listModal.forEach((value) => {
        let newModal = document.createElement('div')
        newModal.classList.add('block-modal')
        newModal.innerHTML = `
        <div>
            <img src="./image/${value.image}" alt="">
            <h3>${value.name}</h3>
            <p>${value.price}</p>
            <p>${value.component}</p>
        </div>
    `
        modal.appendChild(newModal)
    })
}
function keyModalOpen(key) {
    if (listModal[key] == null) {
        listModal[key] = JSON.parse(JSON.stringify(products[key]));
    }
    modal.style.display = "block"
    openModal();
}