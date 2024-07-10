import { CommandLine } from "./components/commandLine";
import { History } from "./components/history";

export default async function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
      <div className="grid col-span-1 sm:col-span-2 order-2 sm:order-1 mt-8 sm:mt-0">
        <History />
        <CommandLine />
      </div>

      <div className="grid col-span-1 order-1 sm:order-2">TODO</div>
    </div>
  );
}
