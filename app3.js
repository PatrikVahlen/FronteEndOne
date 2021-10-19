const url = "https://mock-data-api.firebaseio.com/webb21/products.json" //Vår API
const articleListElement = document.getElementById("articleList") //Identifierar vår div i DOM:en som det ska appendas till
const buttonFilterElement = document.getElementById("buttonFilter") //Identifierar vår filterknapp

let sum = 0 //Vår summa vi handlat för
let rating = 0 //Vår rating, från början 0 så allt ska synas


function renderArticleItem(articleItem, rating) { //renderar våra object
    console.log(rating)
    const articleItemElement = document.createElement("div")

    const titleElement = document.createElement("h2") //Skapa en H2
    titleElement.innerText = articleItem.name          //Hämtar name och sätter titel till vår H2

    const descriptionElement = document.createElement("p")
    descriptionElement.innerText = articleItem.description  //Sätter description

    const pricingElement = document.createElement("p")
    pricingElement.innerText = `Price: ${articleItem.price}` //Sätter priset

    const ratingElement = document.createElement("p")
    ratingElement.innerText = `Rating: ${articleItem.rating}` //Sätter rating

    const stockElement = document.createElement("p")
    stockElement.innerText = `Stock: ${articleItem.stock}`//Sätter stock/lager

    const imageElement = document.createElement("img")
    imageElement.src = articleItem.images[0].src.small //Sätter bilden
    imageElement.alt = articleItem.images[0].alt //Sätter alt-bild

    const buttonBuyElement = document.createElement("button")
    buttonBuyElement.innerText = "Köp" //Genererar en knapp med label köp

    articleItemElement.append(titleElement) //appendar titeln till vår div
    articleItemElement.append(imageElement) //appendar bilden till vår div
    articleItemElement.append(descriptionElement) //appendar description till vår div
    articleItemElement.append(pricingElement) //appendar vårt pris till vår div
    articleItemElement.append(ratingElement) //appendar vår rating till vår div
    articleItemElement.append(stockElement) //appendar vårt lager till vår div
    articleItemElement.append(buttonBuyElement) //appendar vår köpknapp till vår div

    buttonBuyElement.addEventListener("click", event => { //Skapar en eventlistener för varje knapp, som lyssnar efter tryck
        const sumPricingElement = document.getElementById("total") //identifierar vår p-tagg där summan vi handlat för ska skrivas ut
        const articleItemPrice = document.getElementById("shoppingList") //identifierar vår div där vi ska appenda vad vi handlat 
        const articleObject = document.createElement("p") //skapar en p-tagg där vi skriver in vad vi handlat
        sum += parseInt(articleItem.price) //uppdaterar summan vi handlat för, gör om input-sträng till integer
        sumPricingElement.innerText = `Total: ${sum} kr`; //Uppdaterar summan vi handlat för 
        articleObject.innerText = `${articleItem.name} - ${articleItem.price} kr`//Uppdaterar vår varukorg, vad vi precis klickat på /handlat
        articleItemPrice.prepend(articleObject) //prependa det vi precis handlat till vår div
    })

    if (articleItem.rating >= rating) { //Skriver de som är större än vår rating 
        articleListElement.append(articleItemElement) //Appendar vår div till diven i DOM:en
    }
    if (articleItem.rating === undefined && rating == 0) { //Skriver ut de som är undefined om rating = 0
        articleListElement.append(articleItemElement)
    }

}

function renderArticleList(articleList) {

    articleList.forEach(articleItem => { //tar emot array och skickar vardera object till ny funktion
        renderArticleItem(articleItem, rating)
    })

    buttonFilterElement.addEventListener("click", event => { //Lyssnar om vi trycker på vår filterknapp
        articleListElement.innerHTML = "" //nollställ våra divar som vi genererat
        let userInput = document.getElementById("input").value //Vår rating vi skrivit i input-fältet
        articleList.forEach(articleItem => {
            renderArticleItem(articleItem, userInput)
        })
    })
}

fetch(url) //Hämta vårt API/URL
    .then(response => response.json())
    .then(data => {
        renderArticleList(data) //Skicka array med object
    })
