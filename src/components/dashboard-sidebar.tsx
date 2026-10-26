import { Link } from "@tanstack/react-router";
import { Award, LayoutDashboard, ListTodo, Trophy, Users } from "lucide-react";

const links = [
  { label: "Dashboard", to: "/" as const, icon: LayoutDashboard },
  { label: "Backlog", to: "/backlog" as const, icon: ListTodo },
  { label: "Team", to: "/team" as const, icon: Users },
  { label: "Leaderboard", to: "/leaderboard" as const, icon: Trophy },
  { label: "Badges", to: "/badges" as const, icon: Award },
];

type Page = (typeof links)[number]["label"];

export function DashboardSidebar({
  activePage,
  showSprintTip = false,
  bonusXP = 5,
}: {
  activePage: Page;
  showSprintTip?: boolean;
  bonusXP?: number;
}) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-1 border-r border-border bg-card p-5 lg:flex">
      <div className="mb-6 flex items-center gap-2">
        <img src="/teamsync-logo.png" alt="" className="h-9 w-9 rounded-lg object-contain" />
        <div>
          <p className="text-xs leading-none text-muted-foreground">Team</p>
          <p className="text-lg font-extrabold leading-tight">
            TeamSync<span className="text-lilac"> XP</span>
          </p>
        </div>
      </div>

      {links.map(({ label, to, icon: Icon }) => (
        <Link
          key={label}
          to={to}
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
            activePage === label
              ? "bg-primary-soft text-primary"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}

      <Link
        to="/login"
        className="mt-2 rounded-lg px-3 py-2 text-sm font-medium text-urgent hover:bg-urgent-soft"
      >
        Log out
      </Link>

      {showSprintTip && (
        <div className="mt-auto rounded-lg bg-sun-soft p-4">
          <p className="text-xs font-semibold text-soon">Sprint 4 · Week 2</p>
          <p className="mt-1 text-sm">
            Finish tasks early for <b>+{bonusXP} bonus XP</b>!
          </p>
        </div>
      )}
    </aside>
  );
}
