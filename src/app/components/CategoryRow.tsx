import Link from "next/link";
import { Article } from "../types";


// 2. The Time Converter Function (Turns a date into "1h" or "2d")
function timeAgo(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d`;
}

export default function CategoryRow({ title, articles }: { title: string, articles: Article[] }) {
  const categoryArticles = articles.filter(
    (article) => article.category.toLowerCase() === title.toLowerCase()
  );

  if (categoryArticles.length === 0) return null;

  const featured = categoryArticles[0];
  const sideArticles = categoryArticles.slice(1, 9); 

  return (
    <section id={title.toLowerCase()} className="mb-20">
      
      <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b-4 border-blue-600 pb-2 inline-block">
        {title}
      </h2>
      
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
          
          {/* THE NEW METADATA LINE FOR THE HERO */}
          <div className="text-sm text-slate-500 font-semibold mb-3 flex items-center gap-2">
            <span suppressHydrationWarning className="text-red-600 font-black">{timeAgo(featured.CreatedAt)}</span>
            <span>|</span>
            <span>{featured.author || "BCOS News"}</span>
          </div>

          <Link href={`/article/${featured.id}`}>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-4 cursor-pointer">
              {featured.title}
            </h3>
          </Link>
          <p className="text-lg text-slate-600 line-clamp-2">{featured.summary}</p>
        </div>

        {/* RIGHT SIDE: The Sidebar Articles */}
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
                
                {/*  THE NEW METADATA LINE FOR SIDEBAR ARTICLES  */}
                <div className="text-xs text-slate-500 font-semibold mb-1">
                  <span suppressHydrationWarning className="text-red-600 font-black">{timeAgo(article.CreatedAt)}</span> | {article.author || "BCOS News"}
                </div>

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
    </section>
  );
}