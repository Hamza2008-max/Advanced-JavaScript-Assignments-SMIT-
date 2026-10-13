const products = [
    {
        name: "Classic Red Sneakers",
        category: "Sneakers",
        price: 65,
        description: "Bright, comfortable shoes for everyday wear.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
        alt: "Red athletic sneaker",
    },
    {
        name: "Everyday White Sneakers",
        category: "Sneakers",
        price: 72,
        description: "A simple style that goes with almost anything.",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",
        alt: "White everyday sneakers",
    },
    {
        name: "Lightweight Running Shoes",
        category: "Running",
        price: 89,
        description: "Light cushioning for your daily run.",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=80",
        alt: "Lightweight running shoes",
    },
    {
        name: "Trail Runner",
        category: "Running",
        price: 110,
        description: "Extra grip for walks and outdoor trails.",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=700&q=80",
        alt: "Outdoor running shoes",
    },
    {
        name: "Canvas Slip-ons",
        category: "Casual",
        price: 48,
        description: "Easy slip-on shoes for relaxed days.",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80",
        alt: "Casual canvas shoes",
    },
    {
        name: "Everyday Walking Shoes",
        category: "Casual",
        price: 58,
        description: "A comfortable pair for being on your feet.",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80",
        alt: "Everyday walking shoes",
    },
    {
        name: "Brown Leather Loafers",
        category: "Formal",
        price: 125,
        description: "A smart, classic shoe for work or special days.",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=700&q=80",
        alt: "Brown leather formal shoes",
    },
    {
        name: "Simple Black Flats",
        category: "Formal",
        price: 79,
        description: "A neat and comfortable pair for any occasion.",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80",
        alt: "Black flat shoes",
    },
];

const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const priceFilter = document.querySelector("#price-filter");
const priceOutput = document.querySelector("#price-output");
const sortFilter = document.querySelector("#sort-filter");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const cartCount = document.querySelector("#cart-count");

let cartItems = 0;

function showProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const maxPrice = Number(priceFilter.value);

    let filteredProducts = products.filter(function (product) {
        const productInfo = `${product.name} ${product.category} ${product.description}`.toLowerCase();
        const matchesSearch = productInfo.includes(searchText);
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortFilter.value === "price-low") {
        filteredProducts.sort(function (first, second) {
            return first.price - second.price;
        });
    } else if (sortFilter.value === "price-high") {
        filteredProducts.sort(function (first, second) {
            return second.price - first.price;
        });
    } else if (sortFilter.value === "name") {
        filteredProducts.sort(function (first, second) {
            return first.name.localeCompare(second.name);
        });
    }

    let productCards = "";

    filteredProducts.forEach(function (product) {
        productCards += `
            <article class="product-card">
                <img class="product-image" src="${product.image}" alt="${product.alt}" loading="lazy">
                <div class="product-details">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="product-price">$${product.price}</span>
                        <button class="btn btn-sm btn-accent" type="button" data-product-name="${product.name}">
                            Add to bag
                        </button>
                    </div>
                </div>
            </article>
        `;
    });

    productGrid.innerHTML = productCards;
    resultCount.textContent = `${filteredProducts.length} shoes`;
    productGrid.classList.toggle("d-none", filteredProducts.length === 0);
    emptyState.classList.toggle("d-none", filteredProducts.length > 0);
    priceOutput.textContent = `$${priceFilter.value}`;
}

function clearFilters() {
    searchInput.value = "";
    categoryFilter.value = "all";
    priceFilter.value = priceFilter.max;
    sortFilter.value = "featured";
    showProducts();
}

searchInput.addEventListener("input", showProducts);
categoryFilter.addEventListener("change", showProducts);
priceFilter.addEventListener("input", showProducts);
sortFilter.addEventListener("change", showProducts);
document.querySelector("#clear-filters").addEventListener("click", clearFilters);
document.querySelector("#empty-clear").addEventListener("click", clearFilters);

productGrid.addEventListener("click", function (event) {
    if (event.target.closest("[data-product-name]")) {
        cartItems += 1;
        cartCount.textContent = cartItems;
    }
});

showProducts();
