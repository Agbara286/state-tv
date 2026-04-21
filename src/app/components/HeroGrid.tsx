import Link from "next/link";

type Article = {
  id: number;
  title: string;
  category: string;
  summary: string;
  image_url: string;
};

export default function CategoryRow({ title, articles }: { title: string, articles: Article[] }) {
  //  Filter articles so only this category shows up
  const categoryArticles = articles.filter(
    (article) => article.category.toLowerCase() === title.toLowerCase()
  );

  // If there are no articles in this category, don't show the row at all
  if (categoryArticles.length === 0) return null;

  return (
    <section id={title.toLowerCase()} className="mb-16">
      
      {/* Row Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-black text-slate-900 flex items-center gap-2">
          {title}
          <span className="text-blue-600 text-4xl leading-none">.</span>
        </h2>
      </div>

      {/* The Horizontal Scroll Container */}
      <div className="flex overflow-x-auto gap-6 pb-6 snap-x hide-scrollbar">
        {categoryArticles.map((article) => (
          
          <div key={article.id} className="min-w-[300px] md:min-w-[400px] max-w-[400px] snap-start bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
            {article.image_url && (
              <div className="w-full h-48 bg-slate-100 overflow-hidden shrink-0">
                <img 
                  src={article.image_url} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <Link href={`/article/${article.id}`}>
                <h3 className="text-xl font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors leading-tight">
                  {article.title}
                </h3>
              </Link>
              <p className="text-slate-500 mt-3 line-clamp-2 text-sm flex-1">
                {article.summary}
              </p>
            </div>
          </div>

        ))}
      </div>
    </section>
  );
}