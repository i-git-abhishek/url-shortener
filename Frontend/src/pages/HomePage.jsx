import { useEffect, useState } from "react";
import UrlForm from "../components/UrlForm.jsx";
import ShortUrlCard from "../components/ShortUrlCard.jsx";
import { createShortUrl } from "../api/shortUrl.api.js";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCopied(false);

    try {
      const data = await createShortUrl(url);
      setShortUrl(data?.shortUrl || "");
    } catch (error) {
      console.error("Failed to shorten URL:", error);
      setShortUrl("");
    }
  };

  useEffect(() => {
    if (!shortUrl) return;

    navigator.clipboard
      ?.writeText(shortUrl)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  }, [shortUrl]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-8">URL Shortener</h1>

        <UrlForm url={url} setUrl={setUrl} handleSubmit={handleSubmit} />

        <ShortUrlCard shortUrl={shortUrl} copied={copied} />
      </div>
    </div>
  );
};

export default HomePage;
