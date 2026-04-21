"use client";

import { useState, useEffect } from "react";

export default function NewsletterModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    //  THE CHECK: Look for the note in their browser
    const hasSubscribed = localStorage.getItem("bcos_subscribed");

    // 5-second trap if they haven't subscribed
    if (!hasSubscribed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // Send the email to my new Go API endpoint
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const data = await res.json();

      // Handle the response
      if (res.ok || res.status === 409) {
        setStatus("success");
        setEmail("");
        
        // Lock the trap so it never shows again
        localStorage.setItem("bcos_subscribed", "true");

        // Vanish after 2 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 2000);
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

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl relative max-w-xl w-full overflow-hidden">
        
        <button onClick={() => setIsVisible(false)} className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="relative z-10 text-center">
          {status === "success" ? (
            <div className="py-8">
              <h3 className="text-3xl font-black text-white mb-2">Welcome to the inner circle.</h3>
              <p className="text-slate-400">You will now receive breaking BCOS news directly to your inbox.</p>
            </div>
          ) : (
            <>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Never miss the news.</h3>
              <p className="text-lg text-slate-300 mb-8">Get the most critical updates from Oyo State delivered directly to your inbox. No spam. Just the facts.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                <input type="email" required placeholder="Enter your email address..." value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-full bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                <button type="submit" disabled={status === "loading"} className="w-full py-4 rounded-full bg-blue-600 text-white font-bold tracking-wide hover:bg-blue-500 transition-all disabled:opacity-70">
                  {status === "loading" ? "Joining..." : "Subscribe to BCOS"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}