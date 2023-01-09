fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => {
    console.log(data)
    for  (let i = 0 ; i < data.length; i++) {
        let article = document.createElement('article')
        let h3 = document.createElement('h3')
        let img = document.createElement('img')
        img.src = data[i].imageUrl
        article.appendChild(img)
        h3.innerHTML = data[i].name
        article.appendChild(h3)
        document.getElementById('items').appendChild(article)
    } 
    // addProducts(data)
})