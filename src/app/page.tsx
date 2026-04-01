import { TimeTracker } from "@/components/TimeTracker";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black font-sans">
      <main className="w-full max-w-lg px-4 py-6">
        <h1 className="text-xl font-semibold mb-6">时间流记录</h1>
        <TimeTracker />
      </main>
    </div>
  );
}
