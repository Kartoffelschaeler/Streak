import { getCurrentStreak } from "@/lib/streak";

export const dynamic = "force-dynamic";

export default function Home() {
  const streak = getCurrentStreak();

  return (
    <main className="page">
      <section className="streak" aria-label={`${streak} Tage Streak`}>
        <div className="number">{streak}</div>
        <div className="label">days</div>
      </section>
    </main>
  );
}
