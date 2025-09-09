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

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api.get<Product[]>("/products")
       .then(res => setProducts(res.data))
       .catch(err => console.error(err));
  };

  // Add new product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/products", { name, description, price, stock });
      setName("");
      setDescription("");
      setPrice(0);
      setStock(0);
      fetchProducts(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Products</h1>

      <form onSubmit={handleAddProduct} style={{ marginBottom: "2rem" }}>
        <h2>Add New Product</h2>
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
        <button type="submit">Add Product</button>
      </form>

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map(p => (
            <li key={p.id} style={{ marginBottom: "1rem" }}>
              <strong>{p.name}</strong> - ${p.price} ({p.stock} in stock)
              <p>{p.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
