export default function SelectArticleSidebar() {
    return (
      <div className="flex gap-5 h-full w-[50rem]">
        <div className="p-2 md:pt-6 md:pl-8 md:pr-8 rounded-tl-md rounded-l-md border border-neutral-200 opacity-50 dark:border-neutral-700 bg-primary dark:bg-neutral-900 flex flex-col flex-1">
          <div className="flex flex-1 flex-col gap-2 self-center justify-center">
            <h1 className="font-slim text-lg text-slate-500">Select an Article</h1>
          </div>
        </div>
      </div>
    );
  }
  