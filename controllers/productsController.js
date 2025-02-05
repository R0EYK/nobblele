// controllers/productsController.js

const Product = require('../models/productModel');
const Brand = require('../models/brandModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.getSaleProducts = async (req, res) => {
    try {
        // Find products with a discount
        const products = await Product.find({ discount: { $gt: 0 } }).populate("brand").exec();
        res.render('sale', { products });
    } catch (error) {
        res.status(500).send('Error fetching sale products');
    }
};

exports.getProductsByBrand = async (req, res) => {
    try {
      const brandId = req.params.brandId;
  
      console.log('Brand ID:', brandId);
      console.log('Is valid ObjectId:', mongoose.Types.ObjectId.isValid(brandId));
  
      // Check if brandId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(brandId)) {
        return res.status(400).send('Invalid brand ID');
      }
  
      // Using mongoose.Types.ObjectId to convert brandId
      const products = await Product.find({ brand: new mongoose.Types.ObjectId(brandId) })
                                    .populate("brand")
                                    .exec();
  
      console.log('Fetched products:', products);
  
      res.render('productByBrand', { products });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Error fetching products: ' + error.message);
    }
  };
// Controller method for handling product searches
exports.searchProducts = async (req, res) => {
    const query = req.query.q; // Get the search query from the URL parameter

    try {
        // Perform a case-insensitive search for products with names containing the query
        const results = await Product.find({ name: { $regex: new RegExp(query, 'i') } }).populate("brand").exec();

        if (results.length === 0) {
            return res.render('searchResult', { query, results, message: 'No results found.' });
        }

        res.render('searchResult', { query, results });
    } catch (err) {
        console.error('Error searching products:', err);
        res.status(500).send('Server Error');
    }
};


// Fetch all products categorized as "jewelry"
exports.getJewelry = async (req, res) => {
    const category = 'Jewelry';
    const { brand, gender, maxPrice } = req.query;

    try {
        // Build filter criteria
        let filter = { category };

        // Apply optional filters
        if (brand) {
            filter['brand'] = brand;
        }
        if (gender) {
            filter['gender'] = gender;
        }

        // Fetch products matching the filter criteria
        let products = await Product.find(filter).populate('brand').exec();

        // Filter products by maxPrice considering discounted prices
        if (maxPrice !== undefined && !isNaN(parseFloat(maxPrice))) {
            products = products.filter(product => {
                const discountedPrice = product.discountedPrice; // Access the virtual discountedPrice
                return discountedPrice <= parseFloat(maxPrice);
            });
        }

        // Fetch available brands for dropdown
        const brands = await Brand.find({}, 'name').exec();

        // Render the page with products and brands
        const message = products.length === 0 ? 'No products found' : null;

        res.render('jewelryPage', { products, brands, maxPrice, brandFilter: brand, genderFilter: gender, message });
    } catch (err) {
        console.error('Error fetching jewelry:', err);
        res.status(500).send('Server Error');
    }
};

// Fetch all products categorized as "Bags"
exports.getBags = async (req, res) => {
    const category = 'Bags';
    const { brand, gender, maxPrice } = req.query;

    try {
        // Build filter criteria
        let filter = { category };

        // Apply optional filters
        if (brand) {
            filter['brand'] = brand;
        }
        if (gender) {
            filter['gender'] = gender;
        }

        // Fetch products matching the filter criteria
        let products = await Product.find(filter).populate('brand').exec();

        // Filter products by maxPrice considering discounted prices
        if (maxPrice !== undefined && !isNaN(parseFloat(maxPrice))) {
            products = products.filter(product => {
                const discountedPrice = product.discountedPrice; // Access the virtual discountedPrice
                return discountedPrice <= parseFloat(maxPrice);
            });
        }

        // Fetch available brands for dropdown
        const brands = await Brand.find({}, 'name').exec();

        // Render the page with products and brands
        const message = products.length === 0 ? 'No products found' : null;

        res.render('bagsPage', { products, brands, maxPrice, brandFilter: brand, genderFilter: gender, message });
    } catch (err) {
        console.error('Error fetching bags:', err);
        res.status(500).send('Server Error');
    }
};

// Fetch all products categorized as "Wallets"
exports.getWallets = async (req, res) => {
    const category = 'Wallets';
    const { brand, gender, maxPrice } = req.query;

    try {
        // Build filter criteria
        let filter = { category };

        // Apply optional filters
        if (brand) {
            filter['brand'] = brand;
        }
        if (gender) {
            filter['gender'] = gender;
        }

        // Fetch products matching the filter criteria
        let products = await Product.find(filter).populate('brand').exec();

        // Filter products by maxPrice considering discounted prices
        if (maxPrice !== undefined && !isNaN(parseFloat(maxPrice))) {
            products = products.filter(product => {
                const discountedPrice = product.discountedPrice; // Access the virtual discountedPrice
                return discountedPrice <= parseFloat(maxPrice);
            });
        }

        // Fetch available brands for dropdown
        const brands = await Brand.find({}, 'name').exec();

        // Render the page with products and brands
        const message = products.length === 0 ? 'No products found' : null;

        res.render('walletsPage', { products, brands, maxPrice, brandFilter: brand, genderFilter: gender, message });
    } catch (err) {
        console.error('Error fetching wallets:', err);
        res.status(500).send('Server Error');
    }
};


exports.getAccessories = async (req, res) => {
    const category = 'Accessories';
    const { brand, gender, maxPrice } = req.query;

    try {
        // Build filter criteria
        let filter = { category };

        // Apply optional filters
        if (brand) {
            filter['brand'] = brand;
        }
        if (gender) {
            filter['gender'] = gender;
        }

        // Fetch products matching the filter criteria
        let products = await Product.find(filter).populate('brand').exec();

        // Filter products by maxPrice considering discounted prices
        if (maxPrice !== undefined && !isNaN(parseFloat(maxPrice))) {
            products = products.filter(product => {
                const discountedPrice = product.discountedPrice; // Access the virtual discountedPrice
                return discountedPrice <= parseFloat(maxPrice);
            });
        }

        // Fetch available brands for dropdown
        const brands = await Brand.find({}, 'name').exec();

        // Render the page with products and brands
        const message = products.length === 0 ? 'No products found' : null;

        res.render('accessoriesPage', { products, brands, maxPrice, brandFilter: brand, genderFilter: gender, message });
    } catch (err) {
        console.error('Error fetching accessories:', err);
        res.status(500).send('Server Error');
    }
};




// Fetch a list of products
exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("brand").exec();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Fetch and render product details by productId
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params._id;

        if (!ObjectId.isValid(productId)) {
            console.log('Invalid ObjectId format:', productId);
            return res.status(404).send('Product not found');
        }

        console.log('Fetching product details for productId:', productId);

        const product = await Product.findById(productId).populate("brand").exec();

        if (!product) {
            console.log('Product not found for productId:', productId);
            return res.status(404).send('Product not found');
        }

        res.render('productPage', { product });
    } catch (err) {
        console.error('Error fetching product details:', err);
        res.status(500).send('Server Error');
    }
};

