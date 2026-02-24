import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { toast } from "react-toastify";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const { addToCart, items: cartItems } = useCartStore();

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }, [products, searchTerm]);

  useEffect(() => {
    inputRef.current?.focus();
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 relative text-slate-900">
      {/* Cart */}
      <Link
        to="/cart"
        className="fixed top-6 right-6 z-20 bg-white/80 p-2 rounded-full shadow-md hover:scale-105 transform transition"
      >
        <span className="text-lg">🛍️</span>
        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
          {cartItems.length}
        </span>
      </Link>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            <span className="text-slate-400">Store.</span>{" "}
            <span className="text-purple-700">Future Products</span>
          </h1>

          {/* Search */}
          <div className="max-w-xl bg-white rounded-2xl shadow-sm p-2 relative">
            <span className="absolute left-4 top-3 text-slate-400">🔍</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent p-3 pl-10 outline-none text-base placeholder:text-muted"
            />
          </div>
        </header>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-10 w-10 border-2 border-slate-300 border-t-blue-600 rounded-full"></div>
          </div>
        ) : (
          <>
                <p className="text-sm text-slate-500 mb-8 font-medium">
                  Showing <span className="text-purple-600 font-semibold">{filteredProducts.length}</span> products
                </p>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const existingItem = cartItems.find(
                  (i) => i.id === product.id
                );

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col"
                  >
                    {/* Image */}
                    <div className="h-44 rounded-xl bg-slate-100 mb-4 overflow-hidden flex items-center justify-center">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-400"
                      />
                    </div>

                    {/* Info */}
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Bottom */}
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-bold text-base text-slate-900">
                        ${product.price}
                      </span>

                      <button
                        onClick={() => {
                          if (existingItem && existingItem.quantity >= 10) {
                            toast.error("Maximum 10 items allowed", {
                              autoClose: 1500,
                            });
                            return;
                          }
                          addToCart(product);
                          toast.info("Added to cart", {
                            autoClose: 1200,
                          });
                        }}
                        className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-colors text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
