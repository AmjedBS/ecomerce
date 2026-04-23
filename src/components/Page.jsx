import { useCounterStore } from "../store";

export default function Page1() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-72 text-center border border-gray-100">
        
        {/* Title */}
        <h1 className="text-sm font-medium text-slate-500 mb-2">
          Counter
        </h1>

        {/* Count */}
        <div className="text-4xl font-semibold text-slate-900 mb-5 transition-all duration-300">
          {count}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={decrement}
            className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-slate-700 font-medium transition-all duration-200 active:scale-95"
          >
            −
          </button>

          <button
            onClick={increment}
            className="flex-1 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white font-medium transition-all duration-200 active:scale-95 shadow-sm"
          >
            +
          </button>
        </div>

      </div>
    </div>
  );
}