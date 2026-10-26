import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DashboardSidebar } from "../components/dashboard-sidebar";

export const Route = createFileRoute("/backlog")({
  head: () => ({
    meta: [
      { title: "Backlog — TeamSync XP" },
      { name: "description", content: "Browse sprint tasks, priorities, assignees, and statuses." },
    ],
  }),
  component: Backlog,
});

type TaskStatus = "To do" | "In progress" | "Done";
type TaskPriority = "High" | "Medium" | "Low";

const tasks: {
  id: string;
  title: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  due: string;
}[] = [
  {
    id: "TS-101",
    title: "Design login screen",
    assignee: "Ayesha",
    priority: "High",
    status: "Done",
    due: "Overdue",
  },
  {
    id: "TS-102",
    title: "Set up SQL schema for tasks",
    assignee: "Afsheen",
    priority: "High",
    status: "In progress",
    due: "Overdue",
  },
  {
    id: "TS-103",
    title: "Build task filter bar",
    assignee: "Laharika",
    priority: "Medium",
    status: "To do",
    due: "In 10 hours",
  },
  {
    id: "TS-104",
    title: "Leaderboard component",
    assignee: "Laharika",
    priority: "Medium",
    status: "In progress",
    due: "In 20 hours",
  },
  {
    id: "TS-105",
    title: "Write README & Git workflow",
    assignee: "Ayesha",
    priority: "Low",
    status: "To do",
    due: "In 3 days",
  },
  {
    id: "TS-106",
    title: "Responsive dashboard layout",
    assignee: "Laharika",
    priority: "High",
    status: "Done",
    due: "Overdue",
  },
  {
    id: "TS-107",
    title: "Deadline reminder logic",
    assignee: "Afsheen",
    priority: "Medium",
    status: "Done",
    due: "In 1 day",
  },
  {
    id: "TS-108",
    title: "Badge icons & styles",
    assignee: "Ayesha",
    priority: "Low",
    status: "To do",
    due: "Overdue",
  },
  {
    id: "TS-109",
    title: "Node.js API endpoints",
    assignee: "Afsheen",
    priority: "High",
    status: "To do",
    due: "In 2 days",
  },
];

const priorityStyles: Record<TaskPriority, string> = {
  High: "bg-urgent-soft text-urgent",
  Medium: "bg-sun-soft text-soon",
  Low: "bg-primary-soft text-primary",
};

const statusStyles: Record<TaskStatus, string> = {
  "To do": "bg-lilac-soft text-lilac",
  "In progress": "bg-sun-soft text-soon",
  Done: "bg-success-soft text-success",
};

function Backlog() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const filteredTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          (statusFilter === "All" || task.status === statusFilter) &&
          `${task.id} ${task.title} ${task.assignee}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, statusFilter],
  );
  const selectClass =
    "h-10 rounded-md border border-input bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="dashboard-theme min-h-screen bg-background font-sans text-foreground lg:flex">
      <DashboardSidebar activePage="Backlog" />

      <main className="flex-1 space-y-6 p-4 md:p-8">
        <header className="rounded-xl bg-hero p-6 text-primary-foreground md:p-8">
          <p className="text-sm opacity-80">Sprint 4 · Week 2</p>
          <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">Task backlog</h1>
          <p className="mt-2 max-w-lg text-sm opacity-90">
            Review sprint work, owners, priorities, and deadlines in one place.
          </p>
        </header>

        <section className="card-soft p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Sprint tasks</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredTasks.length} of {tasks.length} tasks
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search tasks"
                  aria-label="Search tasks"
                  className={`${selectClass} w-48 pl-9`}
                />
              </label>
              <select
                aria-label="Filter by status"
                className={selectClass}
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option>All</option>
                <option>To do</option>
                <option>In progress</option>
                <option>Done</option>
              </select>
            </div>
          </div>

          <ul className="mt-5 space-y-3">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-primary">{task.id}</p>
                  <h3 className="mt-0.5 font-semibold">{task.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {task.assignee} · Due {task.due}
                  </p>
                </div>
                <span
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}
                >
                  {task.priority}
                </span>
                <span
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold ${statusStyles[task.status]}`}
                >
                  {task.status}
                </span>
              </li>
            ))}
            {filteredTasks.length === 0 && (
              <li className="py-8 text-center text-sm text-muted-foreground">
                No tasks match your search or status filter.
              </li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}
