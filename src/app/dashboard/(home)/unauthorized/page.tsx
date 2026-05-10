export default function Unauthorized() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <h1 className="text-6xl font-black text-red-500">403</h1>
      <p className="mt-4 text-xl font-medium">
        Maaf, Anda tidak punya akses ke fitur ini.
      </p>
      <p className="text-gray-500">
        Silakan hubungi IT Support jika Anda merasa ini adalah kesalahan.
      </p>
    </div>
  );
}
