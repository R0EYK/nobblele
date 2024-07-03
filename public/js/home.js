document.addEventListener('DOMContentLoaded', () => {
    fetch('/products/list')
        .then(response => response.json())
        .then(products => {
            // Sort products by date added (assuming there's a 'createdAt' field)

            // Take the last 4 products
            const last4Products = products.slice(-4);

            const productContainer = document.getElementById('productContainer');
            last4Products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                const productImage = document.createElement('img');
                productImage.src = product.image[0]; // Assuming the first image URL is to be displayed
                productImage.alt = product.name;

                const productName = document.createElement('h2');
                productName.textContent = product.name;

                const productPrice = document.createElement('p');
                productPrice.textContent = `$${product.price}`;

                productDiv.appendChild(productImage);
                productDiv.appendChild(productName);
                productDiv.appendChild(productPrice);

                // Create link to product detail page
                const productLink = document.createElement('a');
                productLink.href = `/products/${product._id}`; // Assuming productId is available in the product object
                productLink.appendChild(productDiv);

                productContainer.appendChild(productLink);
            });
        })
        .catch(err => console.error('Error fetching products:', err));
});
