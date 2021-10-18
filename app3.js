const url = "https://mock-data-api.firebaseio.com/webb21/products.json"
const articleListElement = document.getElementById("articleList")
const buttonFilterElement = document.getElementById("buttonFilter")

let sum = 0
let rating = 0

function renderArticleItem(articleItem, rating) {

    const articleItemElement = document.createElement("div")

    const titleElement = document.createElement("h2")
    titleElement.innerText = articleItem.name

    const descriptionElement = document.createElement("p")
    descriptionElement.innerText = articleItem.description

    const pricingElement = document.createElement("p")
    pricingElement.innerText = `Price: ${articleItem.price}`

    const ratingElement = document.createElement("p")
    ratingElement.innerText = `Rating: ${articleItem.rating}`

    const stockElement = document.createElement("p")
    stockElement.innerText = `Stock: ${articleItem.stock}`

    const imageElement = document.createElement("img")
    imageElement.src = articleItem.images[0].src.small
    imageElement.alt = articleItem.images[0].alt

    const buttonBuyElement = document.createElement("button")
    buttonBuyElement.innerText = "Köp"

    articleItemElement.append(titleElement)
    articleItemElement.append(imageElement)
    articleItemElement.append(descriptionElement)
    articleItemElement.append(pricingElement)
    articleItemElement.append(ratingElement)
    articleItemElement.append(stockElement)
    articleItemElement.append(buttonBuyElement)

    buttonBuyElement.addEventListener("click", event => {
        const sumPricingElement = document.getElementById("total")
        const articleItemPrice = document.getElementById("shoppingList")
        const articleObject = document.createElement("p")
        sum += parseInt(articleItem.price)
        sumPricingElement.innerText = `Total: ${sum} kr`;
        articleObject.innerText = `${articleItem.name} - ${articleItem.price}`
        articleItemPrice.prepend(articleObject)
    })

    if (articleItem.rating >= rating) {
        articleListElement.append(articleItemElement)
    }
}

function renderArticleList(articleList) {
    articleList.forEach(articleItem => {
        renderArticleItem(articleItem, rating)
    })

    buttonFilterElement.addEventListener("click", event => {
        articleListElement.innerHTML = ""
        const userInput = document.getElementById("input").value
        articleList.forEach(articleItem => {
            renderArticleItem(articleItem, userInput)
        })
    })
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        renderArticleList(data)
    })
