const carts = document.getElementById("carts");
const totalData = document.getElementById("totalData");
const modal = document.getElementById("modal");

let products = [];

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

                    <h1 class="text-white text-xl font-bold">${product.title}</h1>

                    <p class="text-zinc-400 mt-2 line-clamp-2">
                        ${product.description}
                    </p>

                    <div class="flex justify-between items-center mt-5">

                        <span class="text-orange-500 font-bold">
                            $${product.price}
                        </span>

                        <button class="bg-orange-500 px-4 py-2 rounded-xl font-bold">
                            Add To Cart
                        </button>

                    </div>

                </div>

            </div>
        `;
    });

    const cards = document.querySelectorAll(".cart");

    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            const product = products[index];

            modal.classList.remove("hidden");

            modal.innerHTML = `
                <div class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">

                    <div class="modal-content bg-zinc-900 p-6 rounded-2xl w-[500px]">

                        <img src="${product.thumbnail}" class="w-full h-[250px] object-cover rounded-xl"/>

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

                            <button class="bg-orange-500 px-5 py-2 rounded-xl font-bold">
                                Add To Cart
                            </button>

                        </div>

                    </div>

                </div>
            `;
        });
    });
}

modal.addEventListener("click", (e) => {
    if (e.target.closest(".modal-content")) return;

    modal.classList.add("hidden");
    modal.innerHTML = "";
});

getProducts();