const UrlForm = ({ url, setUrl, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-lg text-blue-600">
            🔗
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Paste a long URL
            </h2>
            <p className="text-sm text-slate-500">
              Turn it into a short, shareable link instantly.
            </p>
          </div>
        </div>

        <input
          type="url"
          placeholder="https://example.com/very-long-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        Shorten URL
      </button>
    </form>
  );
};

export default UrlForm;
