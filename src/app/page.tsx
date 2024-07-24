import { CommandLine } from "./components/commandLine";
import { History } from "./components/history";
import { Todos } from "./components/todos";

export default async function Home() {
  return (
    <div className="lg:flex items-start justify-center gap-4 space-y-4 lg:space-y-0">
      <div className="lg:flex-col flex-1 space-y-1 max-h-screen overflow-scroll">
        <History />
        <CommandLine />
      </div>

      <div className="flex-1">
        <Todos />
      </div>
    </div>
  );
}
