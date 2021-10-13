const url = "https://mock-data-api.firebaseio.com/webb21/products.json"
const articleListElement = document.getElementById("articleList")
const buttonFilterElement = document.getElementById("buttonFilter")

let sum = 0
let rating = 0

function renderArticleItem(articleItem, rating) {

    const articleItemElement = document.createElement("div")

    const titleElement = document.createElement("h2")
    const descriptionElement = document.createElement("p")
    const pricingElement = document.createElement("p")
    const ratingElement = document.createElement("p")
    const stockElement = document.createElement("p")
    const imageElement = document.createElement("img")
    const buttonBuyElement = document.createElement("button")

    titleElement.innerText = articleItem.name
    descriptionElement.innerText = articleItem.description
    pricingElement.innerText = `Price: ${articleItem.price}`
    ratingElement.innerText = `Rating: ${articleItem.rating}`
    stockElement.innerText = `Stock: ${articleItem.stock}`
    imageElement.src = articleItem.images[0].src.small
    imageElement.alt = articleItem.images[0].alt
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
        const articleItemPrice = document.getElementById("header")
        const articleObject = document.createElement("p")
        sum = sum + parseInt(articleItem.price)
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
