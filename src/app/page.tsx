import Navbar from "./components/Navbar";
import CategoryRow from "./components/CategoryRow";
import { Article } from "./types"; 

export const dynamic = "force-dynamic";

export default async function Home() {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
    cache: 'no-store',
  });
  const json = await res.json();
  const articles: Article[] = json.data || [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/*The Global Header */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        
      

        {/* Category Rows */}
        <CategoryRow title="Politics" articles={articles} />
        <CategoryRow title="Crime" articles={articles} />
        <CategoryRow title="Sports" articles={articles} />
        <CategoryRow title="Entertainment" articles={articles} />
        <CategoryRow title="Tech" articles={articles} />
        <CategoryRow title="Business" articles={articles} />

      </main>
    </div>
  );
}