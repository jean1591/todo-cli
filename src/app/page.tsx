import { CommandLine } from "./components/commandLine";
import { Terminal } from "./components/terminal";

export default function Home() {
  return (
    <div>
      <Terminal />
      <CommandLine />
    </div>
  );
}
