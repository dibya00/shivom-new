export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-100 border-t-brand-orange rounded-full animate-spin"></div>
        <div className="mt-4 text-brand-navy font-semibold tracking-widest uppercase text-sm">Loading Shivom Group</div>
      </div>
    </div>
  );
}
