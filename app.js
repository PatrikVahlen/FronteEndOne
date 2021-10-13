const url = "https://mock-data-api.firebaseio.com/webb21/products.json"
const articleListElement = document.getElementById("articleList")

let sum = 0

function renderArticleItem(articleItem) {

    const articleItemElement = document.createElement("div")
    const titleElement = document.createElement("h2")
    const descriptionElement = document.createElement("p")
    const pricingElement = document.createElement("p")
    const ratingElement = document.createElement("p")
    const stockElement = document.createElement("p")
    const imageElement = document.createElement("img")

    titleElement.innerText = articleItem.name
    descriptionElement.innerText = articleItem.description
    pricingElement.innerText = `Price: ${articleItem.price}`
    ratingElement.innerText = `Rating: ${articleItem.rating}`
    stockElement.innerText = `Stock: ${articleItem.stock}`
    imageElement.src = articleItem.images[0].src.small
    imageElement.alt = articleItem.images[0].alt
    imageElement.id = articleItem.id

    articleItemElement.appendChild(titleElement)
    articleItemElement.appendChild(imageElement)
    articleItemElement.appendChild(descriptionElement)
    articleItemElement.appendChild(pricingElement)
    articleItemElement.appendChild(ratingElement)
    articleItemElement.appendChild(stockElement)

    imageElement.addEventListener("click", event => {
        const sumPricingElement = document.getElementById("total")
        sum = sum + parseInt(articleItem.price)
        sumPricingElement.innerText = `Total: ${sum} kr`;
        console.log(sum)
    })

    articleListElement.appendChild(articleItemElement)

}



function renderArticleList(articleList) {
    articleList.forEach(articleItem => {
        renderArticleItem(articleItem)
    })
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        renderArticleList(data)
    })