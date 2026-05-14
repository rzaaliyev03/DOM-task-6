const carts = document.getElementById("carts");
const totalData = document.getElementById("totalData");
const modal = document.getElementById("modal");
const sebetBtn = document.getElementById("sebetBtn");
const sebetPanel = document.getElementById("sebetPanel");
const closeCart = document.getElementById("closeCart");
const sebetItems = document.getElementById("sebetItems");

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
// render cart

function renderCart() {
    sebetItems.innerHTML = "";

    if (cart.length === 0) {
        sebetItems.innerHTML = `
            <p class="text-zinc-500 text-center mt-10">
                Səbət boşdur
            </p>
        `;
        return;
    }

    cart.forEach((item, index) => {
        sebetItems.innerHTML += `
            <div class="flex gap-3 bg-zinc-800 p-3 rounded-xl mb-3 items-center">

                <img src="${item.thumbnail}" class="w-[60px] h-[60px] object-cover rounded-lg"/>

                <div class="flex-1">
                    <h1 class="text-white text-[14px] font-bold">
                        ${item.title}
                    </h1>

                    <p class="text-orange-500 font-bold">
                        $${item.price}
                    </p>
                </div>

                <button onclick="removeItem(${index})"
                    class="text-red-500 font-bold text-[18px]">
                    ✕
                </button>

            </div>
        `;
    });
}

// remove sebet
function removeItem(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

// fetch
async function getProducts() {

    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    products = data.products;

    totalData.innerHTML = `Total Products: ${products.length}`;

    carts.innerHTML = "";

    products.forEach((product, index) => {

        carts.innerHTML += `
            <div class="cart bg-zinc-900 border border-zinc-800 rounded-[30px] overflow-hidden cursor-pointer">

                <img src="${product.thumbnail}" class="w-full h-[250px] object-cover"/>

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

                        <button class="addBtn bg-orange-500 px-4 py-2 rounded-xl font-bold">
                            Add To Cart
                        </button>

                    </div>

                </div>

            </div>
        `;
    });


    const cards = document.querySelectorAll(".cart");
    const addBtns = document.querySelectorAll(".addBtn");

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

                        <button class="addBtn bg-orange-500 px-5 py-2 rounded-xl font-bold">
                            Add To Cart
                        </button>

                    </div>

                </div>
            `;
        });
    });

    // add cart
    addBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            if (e.target.closest(".addBtn")) {
                cart.push(products[index]);
                saveCart();
                renderCart();
                return;
            }
        });
    });
}

// cart open , close
sebetBtn.addEventListener("click", () => {
    sebetPanel.classList.remove("hidden");
});

closeCart.addEventListener("click", () => {
    sebetPanel.classList.add("hidden");
});

// modal close
modal.addEventListener("click", (e) => {
    if (e.target.closest(".modal-content")) return;

    modal.classList.add("hidden");
    modal.innerHTML = "";
});


renderCart();
getProducts();