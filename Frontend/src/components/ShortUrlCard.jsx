const ShortUrlCard = ({ shortUrl, copied }) => {
  if (!shortUrl) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
    } catch (error) {
      console.error("Failed to copy short URL:", error);
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-emerald-700">
            Your short link is ready
          </h2>
          <p className="text-sm text-emerald-600">
            {copied ? "Copied to clipboard" : "Ready to share"}
          </p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          {copied ? "Copied" : "Live"}
        </span>
      </div>
      <div className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-white p-3 sm:flex-row sm:items-center">
        <a
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 truncate text-sm font-medium text-blue-600 underline decoration-blue-400 underline-offset-2"
        >
          {shortUrl}
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
};

export default ShortUrlCard;
