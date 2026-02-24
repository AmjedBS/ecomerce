import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCartStore } from "../store/useCartStore";

export default function Cart() {
  const {
    items: cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleConfirmCheckout = () => {
    toast.success("Order placed successfully 🚀", {
      autoClose: 2000,
      theme: "colored",
    });

    clearCart();
    setIsModalOpen(false);
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6">
        <p className="text-lg text-slate-500">Your cart is empty 🛒</p>
        <Link
          to="/"
          className="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 relative">
      {/* Close */}
      <Link
        to="/"
        className="fixed top-6 right-6 bg-white/70 p-3 rounded-full shadow-md hover:scale-105 transition"
      >
        ✕
      </Link>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Your <span className="text-purple-700">Cart</span>
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Review your selected products before checkout.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 transition-all"
              >
                {/* Image */}
                <div className="w-full sm:w-28 h-28 bg-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 transition"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-between items-end mt-3">
                    <div className="flex items-center bg-slate-100 rounded-full p-1">
                      <button
                        onClick={() => decreaseQuantity(item)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-full hover:bg-slate-200 disabled:opacity-40"
                      >
                        −
                      </button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item)}
                        disabled={item.quantity >= 10}
                        className="w-8 h-8 rounded-full hover:bg-slate-200 disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>

                <div className="pt-3 border-t flex justify-between items-end">
                  <span className="text-base font-bold">Total</span>
                  <span className="text-2xl font-extrabold text-slate-900">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:scale-[1.01] transition shadow-md"
              >
                Checkout Now 🚀
              </button>

              <Link to="/" className="block text-center mt-3 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3 text-3xl">🛒</div>
              <h2 className="text-xl font-bold">Confirm Order</h2>
              <p className="text-slate-500 mt-1">Total: <span className="font-bold text-slate-800">${totalPrice.toFixed(2)}</span></p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200">Cancel</button>
              <button onClick={handleConfirmCheckout} className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-md">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
