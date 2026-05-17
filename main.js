const carts = document.getElementById("carts");
const totalData = document.getElementById("totalData");
const modal = document.getElementById("modal");
const sebetBtn = document.getElementById("sebetBtn");
const sebetPanel = document.getElementById("sebetPanel");
const closeCart = document.getElementById("closeCart");
const sebetItems = document.getElementById("sebetItems");
const searchInp = document.getElementById("search");
const cartCount = document.getElementById("cartCount");
const clearCart = document.getElementById("clearCart");
let products = [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];






// CLEAR ALL CART
clearCart.addEventListener("click", () => {

    cart = [];

    saveCart();

    renderCart();

});



// SAVE CART
function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}




// RENDER CART
function renderCart() {

    sebetItems.innerHTML = "";

    let totalCount = 0;

    if (cart.length === 0) {

        sebetItems.innerHTML = `
        
            <p class="text-zinc-500 text-center mt-10">
                Səbət boşdur
            </p>

        `;

        cartCount.innerHTML = 0;

        return;
    }

    cart.forEach((item) => {

        totalCount += item.count;

        sebetItems.innerHTML += `
        
            <div class="bg-zinc-800 p-3 rounded-xl mb-3 hover:bg-zinc-700 duration-300">

                <div class="flex gap-3 items-center">

                    <img 
                        src="${item.thumbnail}" 
                        class="w-[60px] h-[60px] object-cover rounded-lg"
                    />

                    <div class="flex-1">

                        <h1 class="text-white text-[14px] font-bold">
                            ${item.title}
                        </h1>

                        <p class="text-orange-500 font-bold">
                            $${item.price} x ${item.count}
                        </p>

                        
                        <div class="flex items-center gap-3 mt-2">

                            <button
                                onclick="decreaseCount(${item.id})"
                                class="bg-zinc-700 w-[28px] h-[28px] rounded-lg hover:bg-red-500 duration-300"
                            >
                                -
                            </button>

                            <span class="font-bold">
                                ${item.count}
                            </span>

                            <button
                                onclick="increaseCount(${item.id})"
                                class="bg-zinc-700 w-[28px] h-[28px] rounded-lg hover:bg-green-500 duration-300"
                            >
                                +
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        `;
    });

    cartCount.innerHTML = totalCount;
}




// PRODUCT COUNT
function increaseCount(id) {

    const product = cart.find((item) => item.id === id);

    product.count++;

    saveCart();

    renderCart();

}




function decreaseCount(id) {

    const product = cart.find((item) => item.id === id);

    
    if (product.count > 1) {

        product.count--;

    }

   
    else {

        cart = cart.filter((item) => item.id !== id);

    }

    saveCart();

    renderCart();

}





// FETCH PRODUCTS
async function getProducts() {

    const res = await fetch("https://dummyjson.com/products");

    const data = await res.json();

    products = data.products;

    totalData.innerHTML = `Total Products: ${products.length}`;

    carts.innerHTML = "";




    // RENDER PRODUCTS
    products.forEach((product, index) => {

        carts.innerHTML += `
        
            <div class="cart bg-zinc-900 border border-zinc-800 rounded-[30px] overflow-hidden cursor-pointer hover:-translate-y-2 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 duration-300">

                <img 
                    src="${product.thumbnail}" 
                    class="w-full h-[250px] object-cover hover:scale-105 duration-500"
                />

                <div class="p-6">

                    <h1 class="text-white text-xl font-bold">
                        ${product.title}
                    </h1>

                    <p class="text-zinc-400 mt-2 line-clamp-2">
                        ${product.description}
                    </p>

                    <div class="flex justify-between items-center mt-5">

                        <span class="text-orange-500 font-bold">
                            $${product.price}
                        </span>

                        <button class="addBtn bg-orange-500 px-4 py-2 rounded-xl font-bold hover:bg-orange-400 hover:scale-110 duration-300 cursor-pointer">
                            Add To Cart
                        </button>

                    </div>

                </div>

            </div>

        `;
    });



    const cards = document.querySelectorAll(".cart");

    const addBtns = document.querySelectorAll(".addBtn");




    // PRODUCT MODAL
    cards.forEach((card, index) => {

        card.addEventListener("click", (e) => {

            if (e.target.closest(".addBtn")) return;

            const product = products[index];

            modal.classList.remove("hidden");

            modal.innerHTML = `
            
                <div class="modal-content bg-zinc-900 p-6 rounded-2xl w-[500px]">

                    <img 
                        src="${product.thumbnail}" 
                        class="w-full h-[250px] object-cover rounded-xl"
                    />

                    <h1 class="text-white text-2xl mt-4 font-bold">
                        ${product.title}
                    </h1>

                    <p class="text-zinc-400 mt-2">
                        ${product.description}
                    </p>

                    <div class="flex justify-between items-center mt-5">

                        <span class="text-orange-500 text-2xl font-bold">
                            $${product.price}
                        </span>

                        <button class="addBtn bg-orange-500 px-5 py-2 rounded-xl font-bold hover:bg-orange-400 hover:scale-110 duration-300 cursor-pointer">
                            Add To Cart
                        </button>

                    </div>

                </div>

            `;
        });
    });




    // ADD TO CART
    addBtns.forEach((btn, index) => {

        btn.addEventListener("click", () => {



            // BUTTON ANIMATION
            btn.innerHTML = "Added ✓";

            btn.classList.add("bg-green-500");

            setTimeout(() => {

                btn.innerHTML = "Add To Cart";

                btn.classList.remove("bg-green-500");

            }, 700);




            const selectedProduct = products[index];

            const existingProduct = cart.find((item) => {

                return item.id === selectedProduct.id;

            });


            if (existingProduct) {

                existingProduct.count++;

            }

            else {

                cart.push({

                    ...selectedProduct,

                    count: 1

                });

            }

            saveCart();

            renderCart();

        });
    });
}



// SEARCH
searchInp.addEventListener("input", () => {

    const value = searchInp.value.toLowerCase();

    const filtered = products.filter((product) => {

        return product.title.toLowerCase().includes(value);

    });

    carts.innerHTML = "";



    filtered.forEach((product) => {

        carts.innerHTML += `
        
            <div class="bg-zinc-900 border border-zinc-800 rounded-[30px] overflow-hidden">

                <img 
                    src="${product.thumbnail}" 
                    class="w-full h-[250px] object-cover"
                />

                <div class="p-6">

                    <h1 class="text-white text-xl font-bold">
                        ${product.title}
                    </h1>

                    <p class="text-zinc-400 mt-2">
                        ${product.description}
                    </p>

                </div>

            </div>

        `;
    });

});





// OPEN CART
sebetBtn.addEventListener("click", () => {

    sebetPanel.classList.remove("hidden");

});



// CLOSE CART
closeCart.addEventListener("click", () => {

    sebetPanel.classList.add("hidden");

});





// CLOSE MODAL
modal.addEventListener("click", (e) => {

    if (e.target.closest(".modal-content")) return;

    modal.classList.add("hidden");

    modal.innerHTML = "";

});




// START PROJECT
renderCart();

getProducts();