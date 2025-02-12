export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground gap-4">
      <h1 className="text-4xl font-bold">Welcome to GPT chat</h1>
      <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-sm md:max-w-md mx-4 text-center">
        This is a chatbot clone using NextJS, Shadcn, Lucid, and Vercel AI SDK
      </p>
    </main>
  );
}
