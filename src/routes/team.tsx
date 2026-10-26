import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, CheckCircle2, LayoutDashboard, ListTodo, Trophy, Users, Zap } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — TeamSync XP" },
      { name: "description", content: "View your TeamSync members and their sprint progress." },
    ],
  }),
  component: Team,
});

const members = [
  { name: "Ayesha", role: "Team member", xp: 15, done: 1, early: 1 },
  { name: "Afsheen", role: "Team member", xp: 15, done: 1, early: 1 },
  { name: "Laharika", role: "Team member", xp: 15, done: 1, early: 1 },
];

function Team() {
  return (
    <div className="dashboard-theme min-h-screen bg-background font-sans text-foreground lg:flex">
      <aside className="hidden w-60 shrink-0 flex-col gap-1 border-r border-border bg-card p-5 lg:flex">
        <div className="mb-6 flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-hero text-primary-foreground">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs leading-none text-muted-foreground">Team</p>
            <p className="text-lg font-extrabold leading-tight">
              TeamSync<span className="text-lilac"> XP</span>
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          to="/backlog"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
        >
          <ListTodo className="h-4 w-4" />
          Backlog
        </Link>
        <Link
          to="/team"
          className="flex items-center gap-3 rounded-md bg-primary-soft px-3 py-2 text-sm font-medium text-primary"
        >
          <Users className="h-4 w-4" />
          Team
        </Link>
        <Link
          to="/leaderboard"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
        >
          <Trophy className="h-4 w-4" />
          Leaderboard
        </Link>
        <Link
          to="/badges"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
        >
          <Award className="h-4 w-4" />
          Badges
        </Link>
        <Link
          to="/login"
          className="mt-2 rounded-lg px-3 py-2 text-sm font-medium text-urgent hover:bg-urgent-soft"
        >
          Log out
        </Link>
      </aside>

      <main className="flex-1 space-y-6 p-4 md:p-8">
        <header className="rounded-xl bg-hero p-6 text-primary-foreground md:p-8">
          <p className="text-sm opacity-80">Sprint 4 · Week 2</p>
          <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">Meet the team</h1>
          <p className="mt-2 max-w-lg text-sm opacity-90">
            Track each teammate's contribution and sprint progress.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <article key={member.name} className="card-soft p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
                  {member.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold">{member.name}</h2>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                <span className="text-lg font-extrabold text-primary">{member.xp} XP</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xl font-bold">{member.done}</p>
                  <p className="text-xs text-muted-foreground">Tasks completed</p>
                </div>
                <div className="rounded-lg bg-sun-soft p-3">
                  <p className="text-xl font-bold">{member.early}</p>
                  <p className="text-xs text-muted-foreground">Finished early</p>
                </div>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm font-medium text-success">
                <CheckCircle2 className="h-4 w-4" />
                Contributing to the sprint
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
