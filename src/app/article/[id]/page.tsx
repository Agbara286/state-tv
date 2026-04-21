import Link from "next/link";
import Newsletter from "../../components/Newsletter";
import NewsletterModal from "../../components/NewsletterModal";

export const dynamic = "force-dynamic"

type Article = {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  image_url: string; 
  author: string;   
  CreatedAt: string;
};

export default async function FullArticlePage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;

  // Fetch the single article from my new Go endpoint
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <Link href="/" className="text-blue-600 hover:underline">&larr; Back to Home</Link>
      </div>
    );
  }

  const article: Article = await res.json();

  return (
    <main className="min-h-screen bg-white">
      <NewsletterModal />
      {/*  THE CINEMATIC HERO IMAGE */}
      {article.image_url && (
        <div className="w-full h-[40vh] md:h-[60vh] bg-gray-100 border-b border-gray-200">
          <img 
            src={article.image_url} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/*  The Article Body */}
      <article className="max-w-3xl mx-auto p-8 pt-12">
        <Link href="/" className="text-blue-600 hover:underline text-sm font-medium mb-8 inline-block">
          &larr; Back to Homepage
        </Link>
        
        <div className="mb-8 border-b border-gray-100 pb-8">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-4 mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium italic">
            {article.summary}
          </p>
        </div>

        <div className="prose prose-lg md:prose-xl text-gray-800 leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>
      </article>
      
     <Newsletter />
    </main>
  );
}