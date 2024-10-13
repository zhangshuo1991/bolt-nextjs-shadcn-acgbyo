import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">软件漏洞搜索</h1>
      <div className="w-full max-w-3xl">
        <SearchBar />
      </div>
      <div className="w-full">
        <SearchResults />
      </div>
    </main>
  );
}
