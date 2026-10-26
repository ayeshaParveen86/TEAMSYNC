import { createFileRoute } from "@tanstack/react-router";
import { Medal, Trophy } from "lucide-react";
import { DashboardSidebar } from "../components/dashboard-sidebar";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — TeamSync XP" },
      {
        name: "description",
        content: "See team rankings, earned XP, completed tasks, and early finishes.",
      },
    ],
  }),
  component: Leaderboard,
});

const rankings = [
  { name: "Ayesha", xp: 15, done: 1, early: 1 },
  { name: "Afsheen", xp: 15, done: 1, early: 1 },
  { name: "Laharika", xp: 15, done: 1, early: 1 },
];

function Leaderboard() {
  return (
    <div className="dashboard-theme min-h-screen bg-background font-sans text-foreground lg:flex">
      <DashboardSidebar activePage="Leaderboard" />

      <main className="flex-1 space-y-6 p-4 md:p-8">
        <header className="rounded-xl bg-hero p-6 text-primary-foreground md:p-8">
          <p className="text-sm opacity-80">Sprint 4 · Week 2</p>
          <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">Team leaderboard</h1>
          <p className="mt-2 max-w-lg text-sm opacity-90">
            Celebrate completed work and see who is earning XP for the team.
          </p>
        </header>

        <section className="card-soft p-5 md:p-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-soon" />
            <h2 className="text-lg font-bold">Sprint rankings</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Earn {10} XP for each completed task and 5 bonus XP for finishing before the deadline.
          </p>
          <ol className="mt-5 space-y-3">
            {rankings.map((member, index) => (
              <li
                key={member.name}
                className={`flex flex-wrap items-center gap-4 rounded-lg border border-border p-4 ${index === 0 ? "bg-sun-soft" : "bg-card"}`}
              >
                <span className="grid h-9 w-9 place-items-center rounded-md bg-muted text-sm font-bold text-muted-foreground">
                  {index < 3 ? (
                    <Medal
                      className={`h-5 w-5 ${index === 0 ? "text-soon" : index === 1 ? "text-muted-foreground" : "text-lilac"}`}
                    />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-md bg-primary text-lg font-bold text-primary-foreground">
                  {member.name[0]}
                </span>
                <div className="min-w-32 flex-1">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.done} task completed · {member.early} finished early
                  </p>
                </div>
                <p className="text-xl font-extrabold text-primary">
                  {member.xp} <span className="text-sm">XP</span>
                </p>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
