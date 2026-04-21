import Navbar from "../../components/Navbar";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Article = {
  id: number;
  title: string;
  category: string;
  summary: string;
  image_url: string;
  author: string;      
  CreatedAt: string;
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Get the category from the URL
  const { slug } = await params;
  
  // 2. Fetch the data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, { cache: 'no-store' });
  const json = await res.json();
  const allArticles: Article[] = json.data || [];

  // 3. Filter for this specific category
  const categoryArticles = allArticles.filter(
    (a) => a.category.toLowerCase() === slug.toLowerCase()
  );

  // 4. Split the articles just like the homepage (1 big, 9 side)
  const featured = categoryArticles[0];
  const sideArticles = categoryArticles.slice(1, 9);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* The Massive Category Title */}
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-12 capitalize tracking-tighter">
          {slug}<span className="text-blue-600">.</span>
        </h1>

        {categoryArticles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xl text-slate-500 font-medium">No articles published in {slug} yet.</p>
          </div>
        ) : (
          /*  TV LAYOUT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT SIDE: The Main Featured Article */}
            <div className="lg:col-span-8 flex flex-col group">
              {featured.image_url && (
                <div className="w-full h-[300px] md:h-[500px] overflow-hidden mb-4 bg-slate-100">
                  <img 
                    src={featured.image_url} 
                    alt={featured.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
              )}
              <Link href={`/article/${featured.id}`}>
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-4 cursor-pointer">
                  {featured.title}
                </h3>
              </Link>
              <p className="text-lg text-slate-600 line-clamp-2">{featured.summary}</p>
            </div>

            {/* RIGHT SIDE: The 9 Sidebar Articles */}
            <div className="lg:col-span-4 flex flex-col gap-6 border-l border-slate-200 lg:pl-6 lg:h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {sideArticles.map((article) => (
                <div key={article.id} className="flex gap-4 group border-b border-slate-100 pb-6 last:border-0 last:pb-0 shrink-0">
                  {article.image_url && (
                    <div className="w-24 h-20 shrink-0 overflow-hidden bg-slate-100">
                      <img 
                        src={article.image_url} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center flex-1">
                    <Link href={`/article/${article.id}`}>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug cursor-pointer line-clamp-3">
                        {article.title}
                      </h4>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}