import { useCounterStore } from "../store";

export default function Header() {
  const count = useCounterStore((state) => state.count);
  const reset = useCounterStore((state) => state.reset);

  return (
    <header className="w-full flex justify-center pt-6">
      <div className="bg-white shadow-md rounded-2xl px-4 py-3 w-72 border border-gray-100 flex items-center justify-between">
        
        {/* Left side */}
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 font-medium">
            Current Count
          </span>
          <span className="text-xl font-semibold text-slate-900">
            {count}
          </span>
        </div>

        {/* Reset button */}
        <button
          onClick={reset}
          className="px-3 py-1.5 rounded-lg bg-purple-700 text-white text-sm font-medium hover:bg-purple-600 transition-all duration-200 active:scale-95 shadow-sm"
        >
          Reset
        </button>

      </div>
    </header>
  );
}