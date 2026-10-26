import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  Flame,
  LayoutDashboard,
  ListTodo,
  Rocket,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/badges")({
  head: () => ({
    meta: [
      { title: "Badges — TeamSync XP" },
      { name: "description", content: "See badges earned by your team and the goals ahead." },
    ],
  }),
  component: Badges,
});

const badges = [
  { icon: Rocket, name: "First Launch", desc: "Complete your first task", earned: true },
  { icon: Zap, name: "Early Birds", desc: "Finish 3 tasks before their deadlines", earned: true },
  { icon: Target, name: "Goal Crushers", desc: "Complete 80% of sprint tasks", earned: false },
  {
    icon: Flame,
    name: "Zero Overdue",
    desc: "Clear the sprint with no overdue tasks",
    earned: false,
  },
];

function Badges() {
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
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
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
          className="flex items-center gap-3 rounded-md bg-primary-soft px-3 py-2 text-sm font-medium text-primary"
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
          <p className="text-sm opacity-80">Team achievements</p>
          <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">Badges</h1>
          <p className="mt-2 max-w-lg text-sm opacity-90">
            Celebrate milestones and see what your team can unlock next.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {badges.map(({ icon: Icon, name, desc, earned }) => (
            <article key={name} className={`card-soft p-5 ${earned ? "" : "opacity-65"}`}>
              <div
                className={`grid h-12 w-12 place-items-center rounded-lg ${earned ? "bg-sun text-foreground" : "bg-muted text-muted-foreground"}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-bold">{name}</h2>
              <p className="mt-1 min-h-10 text-sm text-muted-foreground">{desc}</p>
              <p
                className={`mt-4 text-xs font-bold uppercase tracking-wide ${earned ? "text-success" : "text-muted-foreground"}`}
              >
                {earned ? "Earned" : "In progress"}
              </p>
            </article>
          ))}
        </section>
        <section className="card-soft flex items-center gap-3 p-5">
          <Star className="h-5 w-5 text-soon" />
          <p className="text-sm text-muted-foreground">
            Complete tasks early and keep the sprint on track to earn more team badges.
          </p>
        </section>
      </main>
    </div>
  );
}
