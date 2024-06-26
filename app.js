const div = document.querySelector('#div');

let resData;





function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function renderProduct(){

    axios(
        
        'https://fakestoreapi.com/products'
)
.then((res)=>{
    console.log(res.data);
     resData = res.data.map((item,index)=>{
        let displayTitle = item.title.length > 45 ? `${item.title.slice(0, 45)}...` : item.title;
        div.innerHTML += `
        <div class="card">
        <div class="bg">
        <div class="newBg">
        <div class="title">${displayTitle}</div>
        <img width="80" src="${item.image}" height="30%" alt="product-image">
        <h4 class"price">Price: ${item.price} ${item.rating.count}</h4>
        <button class="cart-button" onclick="addToCart(this,${index})">
        <span class="cart-icon">🛒</span>
        Add to Cart
    </button>
        </div>
        </div>
    <div class="blob"></div>
    </div>`
        return item
    })
    
})

.catch(error=>{
    console.log(`error`,error)
})
}
renderProduct()



let Index = 0;
function addToCart(button) {
    // Check if the button already has the 'added' class
    if (button.classList.contains('added')) {
        // Increment the count for this item
        let countElement = button.querySelector('b');
        let count = parseInt(countElement.textContent); // Get the current count
        count++;
        countElement.textContent = ` ${count} added`;
        console.log(countElement.textContent)
        const newres = resData.map((item=>{
//  `${item.rating.count}`
 return item.rating.count
}));
console.log(newres)
    } 
    else {
        // If not added yet, add the 'added' class and update the button HTML
        button.classList.add('added');
        button.innerHTML = `<span class="cart-icon">✔️</span><b> 1 added</b>`;
    }
}




function filteredItems(Btn){
    div.innerHTML = ''
    console.log(resData)
    
    let filteredData = resData.filter(item => item.category.toUpperCase() === Btn.innerHTML.toUpperCase());
    console.log(Btn.innerHTML)
    filteredData.map((item,index)=>{
        console.log(item.title.length)
        let displayTitle = item.title.length > 40 ? `${item.title.slice(0, 40)}...` : item.title;
    div.innerHTML += `
    <div class="card">
    <div class="bg">
    <div class="newBg">
    <div class="title">${displayTitle}</div>
    <img width="80" src="${item.image}" height="30%" alt="product-image">
    <h4 class"price">Price: ${item.price}</h4>
    <button class="cart-button" onclick="addToCart(this,${index})">
    <span class="cart-icon">🛒</span>
    Add to Cart
</button>
    </div>
    </div>
<div class="blob"></div>
</div>`
})
//  console.log(filteredData)
}




function allItems() {
    renderProduct(); // Assuming this function populates resData asynchronously
    
    // Assuming resData is an array of products
    
    shuffleArray(resData); // Shuffling the array if needed

    div.innerHTML = '';

    resData.forEach((newItem,index) => {
        let displayTitle = newItem.title.length > 40 ? `${newItem.title.slice(0, 40)}...` : newItem.title;

        div.innerHTML += `
        <div class="card">
            <div class="bg">
                <div class="newBg">
                    <div class="title">${displayTitle}</div>
                    <img width="80" src="${newItem.image}" height="30%" alt="product-image">
                    <h4 class="price">Price: ${newItem.price}</h4>
                    <button class="cart-button" onclick="addToCart(this,${index})">
                    <span class="cart-icon">🛒</span>
                        Add to Cart
                    </button>
                </div>
                </div>
                <div class="blob"></div>
                </div>`;
    });
}



