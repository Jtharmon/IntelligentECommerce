import { useEffect, useState } from "react";
import api from "../api";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch products from backend
  const fetchProducts = () => {
    api.get<Product[]>("/products")
       .then(res => setProducts(res.data))
       .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle add or update product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing product
        await api.put(`/products/${editingId}`, { name, description, price, stock });
        setEditingId(null);
      } else {
        // Add new product
        await api.post("/products", { name, description, price, stock });
      }

      const handleAddOrUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const productData = { name, description, price, stock };
      
        try {
          if (editingId) {
            // Update existing product
            await api.put(`/products/${editingId}`, productData);
            setEditingId(null); // reset after update
          } else {
            // Add new product
            await api.post("/products", productData);
          }
      
          // Clear form
          setName("");
          setDescription("");
          setPrice(0);
          setStock(0);
      
          fetchProducts(); // refresh the list
        } catch (err) {
          console.error(err);
        }
      };

      // Reset form
      setName("");
      setDescription("");
      setPrice(0);
      setStock(0);

      fetchProducts(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // Handle deleting a product
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle editing a product (populate form)
  const handleEdit = (product: Product) => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setStock(product.stock);
    setEditingId(product.id);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Products</h1>

      <form onSubmit={handleAddProduct} style={{ marginBottom: "2rem" }}>
        <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={e => setStock(Number(e.target.value))}
          required
        />
        <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
      </form>

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map(p => (
            <li key={p.id} style={{ marginBottom: "1rem" }}>
              <strong>{p.name}</strong> - ${p.price} ({p.stock} in stock)
              <p>{p.description}</p>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
