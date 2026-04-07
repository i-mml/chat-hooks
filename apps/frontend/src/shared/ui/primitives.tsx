import type { PropsWithChildren } from "react";

export function Surface({ children }: PropsWithChildren) {
  return <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">{children}</section>;
}

export function Label({ children }: PropsWithChildren) {
  return <label className="block text-sm font-medium text-zinc-300">{children}</label>;
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500 focus:border-zinc-500"
    />
  );
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}
