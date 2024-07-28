export const getHelpLines = (): string => `<div className="ml-8 space-y-1">
<div className="grid grid-cols-6 gap-x-8">
<p className="text-green-400/70 font-semibold">clear</p>
<p className="col-span-5">Clear terminal</p>
</div>
<div className="grid grid-cols-6 gap-x-8">
<p className="text-green-400/70 font-semibold">help</p>
<p className="col-span-5">Display available commands</p>
</div>
<div className="grid grid-cols-6 gap-x-8">
<p className="text-green-400/70 font-semibold">ls</p>
<p className="col-span-5">Display todos</p>
</div>
<div className="grid grid-cols-6 gap-x-8">
<p className="text-green-400/70 font-semibold">rm</p>
<p className="col-span-5">Delete a todo, "rm 2" delete the second todo - Get todo's index using "ls"</p>
</div>
<div className="grid grid-cols-6 gap-x-8">
<p className="text-green-400/70 font-semibold">stats</p>
<p className="col-span-5">Display user stats</p>
</div>
<div className="grid grid-cols-6 gap-x-8">
<p className="text-green-400/70 font-semibold">touch</p>
<p className="col-span-5">Create a new todo, "touch my new task" for example</p>
</div>
</div>`;
