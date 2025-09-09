import { useEffect, useState } from "react";
import api from "../api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get<Product[]>("/products")
      .then(response => setProducts(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
