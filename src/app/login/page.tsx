export default function Login() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-amber-700 text-white rounded px-4 py-2 hover:bg-amber-800"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
