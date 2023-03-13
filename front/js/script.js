fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
        //console.log(data)
        for (let i = 0; i < data.length; i++) {
            let link = document.createElement('a')
            link.href = "./product.html?id=" + data[i]._id

            let article = document.createElement('article')
            let h3 = document.createElement('h3')
            h3.innerHTML = data[i].name
            h3.className = "productName"

            let p = document.createElement('p')
            p.innerHTML = data[i].description
            p.className = "cart__item__content__description"

            let img = document.createElement('img')
            img.src = data[i].imageUrl
            img.alt = data[i].altTxt

            article.appendChild(img)
            article.appendChild(h3)
            article.appendChild(p)
            link.appendChild(article)

            document.getElementById('items').appendChild(link)
        }
        
    });


