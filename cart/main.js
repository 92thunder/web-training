const priceElements = document.getElementsByClassName("price")
const calcButton = document.getElementById("calc-total-price")
const totalPriceText = document.getElementById("total-price")

// 合計金額を計算し、テキストを書き換える
function calcTotalPrice() {
    let totalPrice = 0
    for (const element of priceElements) {
        totalPrice = totalPrice + Number(element.value)
    }
    totalPriceText.textContent = totalPrice
}

// 計算ボタンをクリックしたときの関数を指定
calcButton.addEventListener("click", calcTotalPrice)


const addItemButton = document.getElementById("add-item")

function addItem() {
    const itemElement = document.getElementsByClassName("item")[0]
    const newItemElement = itemElement.cloneNode(true)
    const form = document.getElementsByTagName("form")[0]
    form.appendChild(newItemElement)
}
addItemButton.addEventListener("click", addItem)