
if(document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready);
}
else {
    ready();
}

function ready() {
    let products = [
        {
            id: 1,
            productName: "camara",
            img: "camera1.jpg",
            price: 25000,
            quantity: 1,
        },
        {
            id: 2,
            productName: "Router",
            img: "camera2.jpg",
            price: 5500,
            quantity: 1,
        },
        {
            id: 3,
            productName: "Laptop",
            img: "camera3.jpg",
            price: 55000,
            quantity: 1,
        },
        {
            id: 4,
            productName: "Mobile",
            img: "Mobile1.jpg",
            price: 12000,
            quantity: 1,
        },
        {
            id: 5,
            productName: "Watch",
            img: "watch1.jpg",
            price: 25000,
            quantity: 1,
        },
        {
            id: 6,
            productName: "Men Shoe",
            img: "shoe2.jpg",
            price: 5500,
            quantity: 1,
        },
        {
            id: 7,
            productName: "Head Phone",
            img: "headphone3.jpg",
            price: 55000,
            quantity: 1,
        },
        {
            id: 8,
            productName: "Printer",
            img: "watch4.jpg",
            price: 12000,
            quantity: 1,
        },
        {
            id: 9,
            productName: "Printer",
            img: "shoe1.jpg",
            price: 12000,
            quantity: 1,
        },
        {
            id: 10,
            productName: "DSLR Camarda",
            img: "watch3.jpg",
            price: 12000,
            quantity: 1,
        },
        {
            id: 11,
            productName: "Canon Printer",
            img: "headphone1.jpg",
            price: 12000,
            quantity: 1,
        },
    ]
    let cardHolder = document.getElementById('cardHolder');
    productCard();
    function productCard() {
        products.forEach((item, key) => {
            let element = document.createElement('div');
            element.classList.add('col');
            element.innerHTML = `
            <div class="card mb-4">
                <img src="./images/${item.img}" class="card-img-top product-img" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.productName}</h5>
                    <p class="card-text">prise: <span class="product-prise">${item.price}</span></p>
                    <div class="d-grid">
                        <button type="button" class="btn btn-outline-dark shop-item-button">Add to Card</button>
                    </div>
                </div>
            </div>
            `;
            cardHolder.append(element);
        })
    }

    let cardRows = document.querySelectorAll('.card-row');
    // ==== Remove each selected products ===
    let removeCardItem = document.querySelectorAll('.selectCard-remove-btn');
        removeCardItem.forEach(removebtn => {
            removebtn.addEventListener('click', removeEachCard);
        })
    // ==== Product quantity update function =====  
    // let inputQtyNumbers = document.querySelectorAll('.card-qty-input');
    //     inputQtyNumbers.forEach(eachInput => {
    //         eachInput.addEventListener('input', quantityChanged);
    //     })
    // =====
    let addToCardButtons = document.querySelectorAll('.shop-item-button');
        addToCardButtons.forEach(addToCardBtn => {
        addToCardBtn.addEventListener('click', addYourCard);
        })
     // ==== Clear Card Button
    let clearCardButton = document.getElementById('clear-card-btn');
        clearCardButton.addEventListener("click", cardClear);
}

function addYourCard(event) {
    let button = event.target;
    let parentCard = button.closest('.col');
    let cardTitle = parentCard.querySelector('.card-title').innerText;
    let cardImgSrc = parentCard.querySelector('.product-img');
    let cardPrise = parentCard.querySelector('.product-prise').innerText;
    // console.log(cardImgSrc.attributes.src.nodeValue);
    addItemToCard(cardImgSrc, cardTitle, cardPrise);
    updateCardTotal();
    // quantityChanged();
}
function addItemToCard(cardImgSrc, cardTitle, cardPrise) {
    let activeCardBody = document.getElementById('activeCardBody');
    let cardRow = document.createElement('tr');
    cardRow.classList.add('card-row');
    let cardImgName = cardImgSrc.attributes.src.nodeValue;
    let title = document.querySelectorAll('.cardProductName');
    for(let i=0; i<title.length; i++) {
        if(title[i].textContent == cardTitle) {
            alert("This product is already selected!");
            return;
        }
    }
    cardRow.innerHTML = cardTitle;
    let addedCardContent = `
        <td class="d-flex flex-row">
            <img src="${cardImgName}" class="me-2" alt="" srcset="" style="width: 30%; height: auto">
            <p class="cardProductName fw-bold">${cardTitle}</p>
        </td>
        <td class="cardPrice fw-bold">${cardPrise}</td>
        <td class="text-end">
            <input type="number" value="1" class="card-qty-input" min="1">
            <button type="button" class="btn btn-outline-danger btn-sm fw-bold selectCard-remove-btn">REMOVE</button>
        </td>`;
    cardRow.innerHTML = addedCardContent
    activeCardBody.appendChild(cardRow);
    cardRow.getElementsByClassName('selectCard-remove-btn')[0].addEventListener("click", removeEachCard);
    cardRow.getElementsByClassName('card-qty-input')[0].addEventListener('input', updateCardTotal);
}
// ================
function removeEachCard(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCardTotal();
}
// function quantityChanged(e) {
//     let input = e.target;
//     if(isNaN(input.value) || input.value < 1) {
//         input.value = 1;
//     }
//     updateCardTotal();
// }
function cardClear() {
    let activeCardClear = document.getElementById('activeCardBody');
    activeCardClear.innerHTML = "";
    document.getElementById('totalPrice').innerText = 0;
    // console.log('Hello');
}

function updateCardTotal() {
    // let cardBody = document.querySelector('tbody');
    let cardRows = document.querySelectorAll('.card-row');
    let totalPrice = 0;
    cardRows.forEach((cardRow) => {
        let priceElement = cardRow.querySelector('.cardPrice');
        let cardQty = cardRow.querySelector('.card-qty-input');
        let price = parseFloat(priceElement.innerHTML);
        let quantity = parseFloat(cardQty.value);
        totalPrice = totalPrice + (price * quantity);
        document.getElementById('totalPrice').innerText = totalPrice;
        // console.log(cardRows);
    })
    if(cardRows.length === 0) {
        document.getElementById('totalPrice').innerText = 0;
    }
}