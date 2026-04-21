"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

 const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // 1. Send the email to my new Go API endpoint
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const data = await res.json();

      // 2. Handle the response 
      if (res.ok || res.status === 409) {
        setStatus("success");
        setEmail("");
         } else {
        // If the server threw an error (like a bad email)
        alert(data.error || "Failed to subscribe. Please try again.");
        setStatus("idle");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center shadow-2xl my-12">
        <h3 className="text-3xl font-black text-white mb-2">Welcome to the inner circle.</h3>
        <p className="text-slate-400">You will now receive breaking BCOS news directly to your inbox.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden relative my-12">
     
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
          Never miss the news.
        </h3>
        <p className="text-lg text-slate-300 mb-8">
          Get the most critical updates from Oyo State delivered directly to your inbox. No spam. Just the facts.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="email"
            required
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-96 px-6 py-4 rounded-full bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold tracking-wide hover:bg-blue-500 transition-all disabled:opacity-70"
          >
            {status === "loading" ? "Joining..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}