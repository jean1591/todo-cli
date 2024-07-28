import { Stats } from "@/app/lib/store/features/terminal/slice";

export const getStatsLines = (stats: Stats) => {
  return `
      <div className="ml-8 p-4 border-[1px] border-zinx-100 w-1/3">
      <div className="flex items-center justify-between">
      <p>Total todos</p>
      <p>${stats.totalTodoCount}</p>
      </div>
      <div className="flex items-center justify-between">
      <p>Active todos</p>
      <p>${stats.currentTodoCount}</p>
      </div>
      <div className="flex items-center justify-between">
      <p>Terminated todos</p>
      <p>${stats.terminatedTodos}</p>
      </div>
      </div>
      `;
};
