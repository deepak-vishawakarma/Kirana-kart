import Product from "../Models/Product.js";

const ProductController = {
  async CreateProduct(req, res) {
    try {
      const newProduct = new Product({
        ProductName: req.body.ProductName,
        ProductPhoto: req.file?.path,
        ProductDetails: req.body.ProductDetails,
        ProductDiscriptions: req.body.ProductDiscriptions,
        ProductReating: req.body.ProductReating,
        ProductPrice:req.body.ProductPrice,
        ProductCetagorie: [req.body.ProductCetagorie]
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: "Failed to create product", details: err.message });
    }
  },

  async GetProduct(req, res) {
    
    try {
      const products = await Product.find().populate("ProductCetagorie");
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch products", details: err.message });
    }
  },

  async GetProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id).populate("ProductCetagorie");
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: "Error fetching product", details: err.message });
    }
  },

  async DeleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Error deleting product", details: err.message });
    }
  },

  async UpdateProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });

      product.ProductName = req.body.ProductName || product.ProductName;
      product.ProductDetails = req.body.ProductDetails || product.ProductDetails;
      product.ProductDiscriptions = req.body.ProductDiscriptions || product.ProductDiscriptions;
      product.ProductReating = req.body.ProductReating || product.ProductReating;
      product.ProductPrice=req.body.ProductPrice || product.ProductPrice;
      product.ProductCetagorie = [req.body.ProductCetagorie] || product.ProductCetagorie;

      if (req.file) {
        product.ProductPhoto = req.file.path;
      }

      await product.save();
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ error: "Error updating product", details: err.message });
    }
  }
};

export default ProductController;
