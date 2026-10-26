import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle, Clock, ListTodo, CheckCircle2, Trophy, Flame, Zap, Target,
  LayoutDashboard, Users, Award, Plus, Search, Medal, Rocket, Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TeamSync XP — Team Task Dashboard" },
      { name: "description", content: "Track team tasks, urgent deadlines, XP points, badges and leaderboard in one dashboard." },
      { property: "og:title", content: "TeamSync XP — Team Task Dashboard" },
      { property: "og:description", content: "Gamified team task manager with urgency highlights and leaderboards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Priority = "High" | "Medium" | "Low";
type Status = "To do" | "In progress" | "Done";
type Task = { id: string; title: string; assignee: string; priority: Priority; status: Status; due: number; doneAt?: number | undefined };

const MEMBERS = ["Ayesha", "Afsheen", "Laharika"];
const HOUR = 3600_000;
const XP_TASK = 10;
const XP_BONUS = 5;
const GOAL = 0.8;

function seed(now: number): Task[] {
  const t = (id: number, title: string, assignee: string, priority: Priority, status: Status, dueH: number, doneH?: number): Task => ({
    id: `TS-${id}`, title, assignee, priority, status, due: now + dueH * HOUR, doneAt: doneH !== undefined ? now + doneH * HOUR : undefined,
  });
  return [
    t(101, "Design login screen", "Ayesha", "High", "Done", -30, -40),
    t(102, "Set up SQL schema for tasks", "Afsheen", "High", "In progress", -5),
    t(103, "Build task filter bar", "Laharika", "Medium", "To do", 10),
    t(104, "Leaderboard component", "Laharika", "Medium", "In progress", 20),
    t(105, "Write README & Git workflow", "Ayesha", "Low", "To do", 72),
    t(106, "Responsive dashboard layout", "Laharika", "High", "Done", -2, -10),
    t(107, "Deadline reminder logic", "Afsheen", "Medium", "Done", 30, -1),
    t(108, "Badge icons & styles", "Ayesha", "Low", "To do", -20),
    t(109, "Node.js API endpoints", "Afsheen", "High", "To do", 48),
  ];
}

function urgency(t: Task, now: number) {
  if (t.status === "Done") return "done" as const;
  if (t.due < now) return "overdue" as const;
  if (t.due - now <= 24 * HOUR) return "soon" as const;
  return "ok" as const;
}

function xpFor(t: Task) {
  if (t.status !== "Done" || !t.doneAt) return 0;
  return XP_TASK + (t.doneAt <= t.due ? XP_BONUS : 0);
}

function fmtDue(due: number, now: number) {
  const h = Math.round((due - now) / HOUR);
  if (h < 0) return `${Math.abs(h) >= 24 ? Math.round(-h / 24) + "d" : -h + "h"} overdue`;
  return h >= 24 ? `in ${Math.round(h / 24)}d` : `in ${h}h`;
}

const prioCls: Record<Priority, string> = {
  High: "bg-urgent-soft text-urgent",
  Medium: "bg-sun-soft text-soon",
  Low: "bg-primary-soft text-primary",
};
const statusCls: Record<Status, string> = {
  "To do": "bg-lilac-soft text-lilac",
  "In progress": "bg-sun text-foreground",
  Done: "bg-success-soft text-success",
};

function Index() {
  const [now, setNow] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fP, setFP] = useState("All");
  const [fA, setFA] = useState("All");
  const [fS, setFS] = useState("All");
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ title: "", assignee: MEMBERS[0] as string, priority: "Medium" as Priority, due: "" });

  useEffect(() => {
    const n = Date.now();
    setNow(n);
    setTasks(seed(n));
    const i = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(i);
  }, []);

  const stats = useMemo(() => {
    if (!now) return null;
    const overdue = tasks.filter((t) => urgency(t, now) === "overdue").length;
    const soon = tasks.filter((t) => urgency(t, now) === "soon").length;
    const pending = tasks.filter((t) => t.status !== "Done").length;
    const done = tasks.length - pending;
    const board = MEMBERS.map((m) => {
      const mine = tasks.filter((t) => t.assignee === m);
      const xp = mine.reduce((s, t) => s + xpFor(t), 0);
      const early = mine.filter((t) => t.doneAt && t.doneAt <= t.due).length;
      return { name: m, xp, done: mine.filter((t) => t.status === "Done").length, early };
    }).sort((a, b) => b.xp - a.xp);
    const teamXp = board.reduce((s, b) => s + b.xp, 0);
    return { overdue, soon, pending, done, board, teamXp, rate: tasks.length ? done / tasks.length : 0 };
  }, [tasks, now]);

  const filtered = useMemo(() => {
    if (!now) return [];
    const order = { overdue: 0, soon: 1, ok: 2, done: 3 };
    return tasks
      .filter((t) => (fP === "All" || t.priority === fP) && (fA === "All" || t.assignee === fA) && (fS === "All" || t.status === fS))
      .filter((t) => t.title.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => order[urgency(a, now)] - order[urgency(b, now)] || a.due - b.due);
  }, [tasks, fP, fA, fS, q, now]);

  if (!now || !stats) return <div className="min-h-screen bg-background" />;

  const level = Math.floor(stats.teamXp / 50) + 1;
  const lvlPct = ((stats.teamXp % 50) / 50) * 100;

  const complete = (id: string) =>
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status: "Done", doneAt: Date.now() } : t)));
  const setStatus = (id: string, status: Status) =>
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status, doneAt: status === "Done" ? Date.now() : undefined } : t)));
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.due) return;
    setTasks((ts) => [...ts, { id: `TS-${110 + ts.length}`, title: form.title, assignee: form.assignee, priority: form.priority, status: "To do", due: new Date(form.due).getTime() }]);
    setForm({ ...form, title: "", due: "" });
  };

  const badges = [
    { icon: Rocket, name: "First Launch", desc: "First task done", got: stats.done >= 1 },
    { icon: Zap, name: "Early Birds", desc: "3 tasks before deadline", got: stats.board.reduce((s, b) => s + b.early, 0) >= 3 },
    { icon: Target, name: "Goal Crushers", desc: "Hit 80% weekly goal", got: stats.rate >= GOAL },
    { icon: Flame, name: "Zero Overdue", desc: "No overdue tasks", got: stats.overdue === 0 },
  ];

  const select = "h-9 rounded-lg border border-input bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground lg:flex">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col gap-1 border-r border-border bg-card p-5 lg:flex">
        <div className="mb-6 flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-hero text-primary-foreground"><Zap className="h-5 w-5" /></div>
          <div><p className="text-xs text-muted-foreground leading-none">Team</p><p className="text-lg font-extrabold leading-tight">TeamSync<span className="text-lilac"> XP</span></p></div>
        </div>
        {[[LayoutDashboard, "Dashboard", true], [ListTodo, "Backlog"], [Users, "Team"], [Trophy, "Leaderboard"], [Award, "Badges"]].map(([I, l, a]) => {
          const Icon = I as typeof Zap;
          return (
            <a key={l as string} href="#" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${a ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted"}`}>
              <Icon className="h-4 w-4" />{l as string}
            </a>
          );
        })}
        <Link to="/login" className="mt-2 rounded-lg px-3 py-2 text-sm font-medium text-urgent hover:bg-urgent-soft">Log out</Link>
        <div className="mt-auto rounded-xl bg-sun-soft p-4">
          <p className="text-xs font-semibold text-soon">Sprint 4 · Week 2</p>
          <p className="mt-1 text-sm">Finish tasks early for <b>+{XP_BONUS} bonus XP</b>!</p>
        </div>
      </aside>

      <main className="flex-1 space-y-6 p-4 md:p-8">
        {/* Header */}
        <header className="relative overflow-hidden rounded-2xl bg-hero p-6 text-primary-foreground md:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sun opacity-30 blur-2xl" />
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm opacity-80">Welcome back, Ayesha 👋</p>
              <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">Let's crush this sprint.</h1>
              <p className="mt-2 max-w-md text-sm opacity-90">Urgent work floats to the top. Every finished task earns your team XP.</p>
            </div>
            <div className="min-w-60 rounded-xl bg-card/15 p-4 backdrop-blur">
              <div className="flex items-center justify-between text-sm"><span className="font-semibold">Team Level {level}</span><span>{stats.teamXp} XP</span></div>
              <div className="mt-2 h-2.5 rounded-full bg-card/25"><div className="h-full rounded-full bg-sun" style={{ width: `${lvlPct}%` }} /></div>
              <p className="mt-1 text-xs opacity-80">{50 - (stats.teamXp % 50)} XP to Level {level + 1}</p>
            </div>
          </div>
        </header>

        {/* Counters */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { l: "Overdue", v: stats.overdue, I: AlertTriangle, c: "bg-urgent-soft text-urgent" },
            { l: "Due in 24h", v: stats.soon, I: Clock, c: "bg-soon-soft text-soon" },
            { l: "Pending", v: stats.pending, I: ListTodo, c: "bg-lilac-soft text-lilac" },
            { l: "Completed", v: stats.done, I: CheckCircle2, c: "bg-success-soft text-success" },
          ].map(({ l, v, I, c }) => (
            <div key={l} className="card-soft flex items-center gap-4 p-4">
              <div className={`grid h-11 w-11 place-items-center rounded-xl ${c}`}><I className="h-5 w-5" /></div>
              <div><p className="text-2xl font-extrabold">{v}</p><p className="text-xs text-muted-foreground">{l}</p></div>
            </div>
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-3">
          {/* Tasks */}
          <section className="card-soft p-5 xl:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold">Tasks</h2>
              <div className="flex flex-wrap gap-2">
                <div className="relative"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className={`${select} w-36 pl-8`} /></div>
                <select className={select} value={fP} onChange={(e) => setFP(e.target.value)}><option value="All">All priorities</option>{["High", "Medium", "Low"].map((p) => <option key={p}>{p}</option>)}</select>
                <select className={select} value={fA} onChange={(e) => setFA(e.target.value)}><option value="All">All assignees</option>{MEMBERS.map((m) => <option key={m}>{m}</option>)}</select>
                <select className={select} value={fS} onChange={(e) => setFS(e.target.value)}><option value="All">All status</option>{["To do", "In progress", "Done"].map((s) => <option key={s}>{s}</option>)}</select>
              </div>
            </div>

            <form onSubmit={addTask} className="mt-4 flex flex-wrap gap-2 rounded-xl bg-muted p-3">
              <input className={`${select} min-w-40 flex-1`} placeholder="New task title…" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <select className={select} value={form.assignee} onChange={(e) => setForm({ ...form, assignee: e.target.value })}>{MEMBERS.map((m) => <option key={m}>{m}</option>)}</select>
              <select className={select} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}>{["High", "Medium", "Low"].map((p) => <option key={p}>{p}</option>)}</select>
              <input type="datetime-local" className={select} value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
              <button className="inline-flex h-9 items-center gap-1 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"><Plus className="h-4 w-4" />Add</button>
            </form>

            <ul className="mt-4 space-y-3">
              {filtered.map((t) => {
                const u = urgency(t, now);
                const ring = u === "overdue" ? "border-l-urgent bg-urgent-soft" : u === "soon" ? "border-l-soon bg-soon-soft" : u === "done" ? "border-l-success opacity-75" : "border-l-lilac";
                return (
                  <li key={t.id} className={`flex flex-wrap items-center gap-3 rounded-xl border border-border border-l-4 bg-card p-4 ${ring}`}>
                    <button onClick={() => t.status !== "Done" && complete(t.id)} aria-label="Complete task" className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${t.status === "Done" ? "border-success bg-success text-primary-foreground" : "border-primary hover:bg-primary-soft"}`}>
                      {t.status === "Done" && <CheckCircle2 className="h-4 w-4" />}
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-primary">{t.id}</span>
                        {u === "overdue" && <span className="rounded-md bg-urgent px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">Overdue</span>}
                        {u === "soon" && <span className="rounded-md bg-soon px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">Urgent · due soon</span>}
                        {u === "done" && xpFor(t) > 0 && <span className="rounded-md bg-sun px-2 py-0.5 text-[10px] font-bold text-foreground">+{xpFor(t)} XP</span>}
                      </div>
                      <p className={`mt-0.5 font-semibold ${t.status === "Done" ? "line-through" : ""}`}>{t.title}</p>
                      <p className={`text-xs ${u === "overdue" ? "font-semibold text-urgent" : "text-muted-foreground"}`}>{t.status === "Done" ? "Completed" : fmtDue(t.due, now)} · {new Date(t.due).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${prioCls[t.priority]}`}>{t.priority}</span>
                    <select value={t.status} onChange={(e) => setStatus(t.id, e.target.value as Status)} className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold ${statusCls[t.status]}`}>
                      {["To do", "In progress", "Done"].map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <div title={t.assignee} className="grid h-8 w-8 place-items-center rounded-full bg-lilac text-xs font-bold text-primary-foreground">{t.assignee[0]}</div>
                  </li>
                );
              })}
              {filtered.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No tasks match these filters.</p>}
            </ul>
          </section>

          <div className="space-y-6">
            {/* Team goal */}
            <section className="card-soft p-5">
              <div className="flex items-center gap-2"><Target className="h-5 w-5 text-lilac" /><h2 className="font-bold">Weekly team goal</h2></div>
              <p className="mt-1 text-xs text-muted-foreground">Complete {GOAL * 100}% of this week's tasks</p>
              <div className="mt-4 flex items-end justify-between"><span className="text-3xl font-extrabold">{Math.round(stats.rate * 100)}%</span><span className="text-xs text-muted-foreground">{stats.done}/{tasks.length} tasks</span></div>
              <div className="relative mt-2 h-3 rounded-full bg-lilac-soft">
                <div className="h-full rounded-full bg-hero transition-all" style={{ width: `${stats.rate * 100}%` }} />
                <div className="absolute -top-1 h-5 w-0.5 bg-sun" style={{ left: `${GOAL * 100}%` }} />
              </div>
              <p className="mt-2 text-xs font-medium">{stats.rate >= GOAL ? "🎉 Goal reached!" : `${Math.ceil(GOAL * tasks.length) - stats.done} more to hit the goal`}</p>
            </section>

            {/* Leaderboard */}
            <section className="card-soft p-5">
              <div className="flex items-center gap-2"><Trophy className="h-5 w-5 text-soon" /><h2 className="font-bold">Leaderboard</h2></div>
              <ol className="mt-4 space-y-2">
                {stats.board.map((b, i) => (
                  <li key={b.name} className={`flex items-center gap-3 rounded-xl p-2.5 ${i === 0 ? "bg-sun-soft" : ""}`}>
                    <span className="w-5 text-center text-sm font-bold text-muted-foreground">{i < 3 ? <Medal className={`h-4 w-4 ${i === 0 ? "text-soon" : i === 1 ? "text-muted-foreground" : "text-lilac"}`} /> : i + 1}</span>
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{b.name[0]}</div>
                    <div className="flex-1"><p className="text-sm font-semibold">{b.name}</p><p className="text-xs text-muted-foreground">{b.done} done · {b.early} early</p></div>
                    <span className="text-sm font-extrabold text-primary">{b.xp} XP</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-muted-foreground">+{XP_TASK} XP per task · +{XP_BONUS} bonus if before deadline</p>
            </section>

            {/* Badges */}
            <section className="card-soft p-5">
              <div className="flex items-center gap-2"><Star className="h-5 w-5 text-primary" /><h2 className="font-bold">Team badges</h2></div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {badges.map(({ icon: I, name, desc, got }) => (
                  <div key={name} className={`rounded-xl p-3 text-center ${got ? "bg-lilac-soft" : "bg-muted opacity-50 grayscale"}`}>
                    <div className={`mx-auto grid h-10 w-10 place-items-center rounded-full ${got ? "bg-hero text-primary-foreground" : "bg-border"}`}><I className="h-5 w-5" /></div>
                    <p className="mt-2 text-xs font-bold">{name}</p>
                    <p className="text-[10px] text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
