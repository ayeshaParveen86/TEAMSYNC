import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarClock,
  Check,
  CircleCheck,
  Clock3,
  LockKeyhole,
  Mail,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — TeamSync XP" },
      {
        name: "description",
        content: "Sign in to TeamSync XP to manage team tasks, deadlines and XP.",
      },
      { property: "og:title", content: "Sign in — TeamSync XP" },
      { property: "og:description", content: "Sign in to your gamified team task dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

const graphLines = [
  [500, 260, 300, 140],
  [500, 260, 710, 115],
  [500, 260, 260, 350],
  [500, 260, 760, 355],
  [500, 260, 500, 445],
  [300, 140, 150, 220],
  [300, 140, 445, 80],
  [710, 115, 850, 205],
  [710, 115, 780, 310],
  [260, 350, 150, 220],
  [260, 350, 390, 440],
  [760, 355, 780, 310],
  [760, 355, 650, 450],
  [500, 445, 390, 440],
  [500, 445, 650, 450],
];

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="relative z-10 flex h-[72px] items-center justify-between border-b border-border bg-card px-5 sm:px-8 lg:px-12">
        <Link to="/login" className="flex items-center gap-2.5" aria-label="TeamSync XP home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-hero text-primary-foreground shadow-sm">
            <Zap className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            TeamSync<span className="text-lilac"> XP</span>
          </span>
        </Link>
        <a
          href="#team-features"
          className="hidden items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary sm:flex"
        >
          Explore team features <ArrowDownRight className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => setMode("up")}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Get started
        </button>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1600px] lg:grid-cols-[0.88fr_1.12fr]">
        <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-14 xl:px-20">
          <div className="w-full max-w-[430px]">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft px-3.5 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />A better rhythm for team projects
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
              Good work moves <span className="text-primary">forward</span> together.
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
              Bring tasks, deadlines and team wins into one clear space. Sign in to pick up where
              your sprint left off.
            </p>

            <div className="mt-9 rounded-2xl border border-border bg-card p-6 shadow-[0_16px_50px_-32px_rgba(67,56,202,0.35)] sm:p-8">
              <h2 className="text-2xl font-extrabold tracking-tight">
                {mode === "in" ? "Welcome back" : "Create your account"}
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {mode === "in"
                  ? "Sign in to continue to your sprint."
                  : "Join your team and start earning XP."}
              </p>

              <form
                className="mt-7 space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  navigate({ to: "/" });
                }}
              >
                {mode === "up" && (
                  <label className="block">
                    <span className="sr-only">Full name</span>
                    <span className="relative block">
                      <Users className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        required
                        autoComplete="name"
                        placeholder="Full name"
                        className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />
                    </span>
                  </label>
                )}
                <label className="block">
                  <span className="sr-only">Email address</span>
                  <span className="relative block">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="Email address"
                      className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </span>
                </label>
                <label className="block">
                  <span className="sr-only">Password</span>
                  <span className="relative block">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      required
                      type="password"
                      autoComplete={mode === "in" ? "current-password" : "new-password"}
                      placeholder="Password"
                      className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </span>
                </label>

                {mode === "in" && (
                  <div className="flex items-center justify-between gap-3 pt-1 text-xs">
                    <label className="flex items-center gap-2 text-muted-foreground">
                      <input type="checkbox" className="h-4 w-4 accent-primary" />
                      Remember me
                    </label>
                    <span className="font-semibold text-primary">Forgot password?</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-md shadow-primary/15 transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
                >
                  {mode === "in" ? "Sign in to TeamSync" : "Create free account"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {mode === "in" ? "New to TeamSync? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "in" ? "up" : "in")}
                  className="font-bold text-primary hover:underline"
                >
                  {mode === "in" ? "Get started" : "Sign in"}
                </button>
              </p>
            </div>
            <p className="mt-5 text-center text-xs text-muted-foreground">
              Demo sign-in takes you straight to your team dashboard.
            </p>
          </div>
        </section>

        <section
          id="team-features"
          className="relative isolate flex min-h-[600px] flex-col justify-between overflow-hidden bg-[#141521] px-6 py-10 text-white sm:px-10 lg:min-h-0 lg:px-12 lg:py-12 xl:px-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_36%,rgba(105,83,230,0.22),transparent_48%),radial-gradient(ellipse_at_12%_90%,rgba(59,130,246,0.14),transparent_42%)]"
          />
          <div className="relative z-10 max-w-lg">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
              One team, moving as one
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Connect the work behind the work.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
              See how tasks, people and progress come together, so your team can focus on what
              matters next.
            </p>
          </div>

          <div className="relative mx-auto my-8 h-[330px] w-full max-w-[720px] sm:h-[410px] lg:my-3">
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 520"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              <defs>
                <linearGradient id="team-sync-line" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8b7cff" stopOpacity=".55" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity=".18" />
                </linearGradient>
              </defs>
              {graphLines.map(([x1, y1, x2, y2], index) => (
                <line
                  key={index}
                  x1={`${x1 / 10}%`}
                  y1={`${(y1 / 520) * 100}%`}
                  x2={`${x2 / 10}%`}
                  y2={`${(y2 / 520) * 100}%`}
                  stroke="url(#team-sync-line)"
                  strokeDasharray="4 8"
                  strokeWidth="1.5"
                />
              ))}
              {[
                [500, 260],
                [300, 140],
                [710, 115],
                [260, 350],
                [760, 355],
                [500, 445],
                [150, 220],
                [445, 80],
                [850, 205],
                [780, 310],
                [390, 440],
                [650, 450],
              ].map(([cx, cy], index) => (
                <circle
                  key={index}
                  cx={`${cx / 10}%`}
                  cy={`${(cy / 520) * 100}%`}
                  r={index === 0 ? 5 : 3}
                  fill={index === 0 ? "#facc15" : "#a5b4fc"}
                  opacity={index === 0 ? 1 : 0.8}
                />
              ))}
            </svg>

            <div className="absolute left-[42%] top-[42%] z-10 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/20 bg-violet-500 shadow-[0_0_40px_rgba(139,92,246,0.45)]">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <div className="absolute left-[42%] top-[42%] z-10 -translate-x-1/2 translate-y-9 whitespace-nowrap rounded-full border border-white/15 bg-[#222330] px-3 py-1 text-[10px] font-semibold text-slate-200">
              Team workspace
            </div>

            <div className="absolute left-[5%] top-[24%] flex items-center gap-2 rounded-xl border border-white/10 bg-[#222330]/95 p-2.5 shadow-xl sm:left-[8%] sm:top-[26%] sm:p-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/20 text-blue-300">
                <CalendarClock className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[9px] text-slate-400">DEADLINE</span>
                <span className="text-xs font-bold">Due in 4 hours</span>
              </span>
              <span className="ml-1 h-2 w-2 rounded-full bg-amber-400" />
            </div>

            <div className="absolute right-[3%] top-[11%] flex items-center gap-2 rounded-xl border border-white/10 bg-[#222330]/95 p-2.5 shadow-xl sm:right-[8%] sm:top-[10%] sm:p-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-400/15 text-amber-300">
                <Trophy className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[9px] text-slate-400">TEAM REWARD</span>
                <span className="text-xs font-bold">+15 XP earned</span>
              </span>
            </div>

            <div className="absolute bottom-[9%] left-[18%] flex items-center gap-2 rounded-xl border border-white/10 bg-[#222330]/95 p-2.5 shadow-xl sm:bottom-[8%] sm:left-[25%] sm:p-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-xs font-extrabold">
                A
              </span>
              <span>
                <span className="block text-[9px] text-slate-400">AYESHA · DESIGN</span>
                <span className="text-xs font-bold">Task completed</span>
              </span>
              <CircleCheck className="ml-1 h-4 w-4 text-emerald-400" />
            </div>

            <div className="absolute bottom-[14%] right-[3%] rounded-xl border border-white/10 bg-[#222330]/95 p-3 shadow-xl sm:bottom-[13%] sm:right-[8%] sm:p-4">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Users className="h-4 w-4 text-violet-300" />
                Weekly team goal
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10 sm:w-28">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-400 to-blue-400" />
                </div>
                <span className="text-[10px] font-bold text-slate-200">68%</span>
              </div>
            </div>

            <div className="absolute left-[48%] top-[4%] grid h-9 w-9 place-items-center rounded-full border-2 border-[#141521] bg-gradient-to-br from-amber-200 to-rose-400 text-[10px] font-extrabold shadow-lg sm:h-11 sm:w-11">
              R
            </div>
            <div className="absolute right-[16%] top-[48%] grid h-9 w-9 place-items-center rounded-full border-2 border-[#141521] bg-gradient-to-br from-emerald-200 to-teal-500 text-[10px] font-extrabold shadow-lg sm:h-11 sm:w-11">
              P
            </div>
            <div className="absolute left-[8%] bottom-[34%] grid h-9 w-9 place-items-center rounded-full border-2 border-[#141521] bg-gradient-to-br from-fuchsia-300 to-violet-600 text-[10px] font-extrabold shadow-lg sm:h-11 sm:w-11">
              M
            </div>

            <div className="absolute left-[71%] top-[62%] hidden items-center gap-1.5 rounded-lg border border-white/10 bg-[#222330] px-2.5 py-2 text-[10px] font-semibold text-slate-300 sm:flex">
              <Check className="h-3 w-3 text-emerald-400" /> Sprint board
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 sm:grid-cols-3 sm:gap-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-400/10 text-blue-300">
                <Clock3 className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-bold">Clear priorities</span>
                <span className="text-[10px] text-slate-400">Deadlines in view</span>
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
                <Trophy className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-bold">Shared wins</span>
                <span className="text-[10px] text-slate-400">Progress earns XP</span>
              </span>
            </div>
            <div className="col-span-2 flex items-center gap-2.5 sm:col-span-1">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
                <Users className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-bold">One team view</span>
                <span className="text-[10px] text-slate-400">Everyone in sync</span>
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
