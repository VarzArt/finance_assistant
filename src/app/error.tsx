"use client";

export default function GlobalError({ error }: { error: unknown }) {
  console.error(error);
  return (
    <html>
      <body className="flex h-dvh items-center justify-center p-6">
        <div>
          <h2 className="text-xl font-semibold">Что-то пошло не так</h2>
          <p className="mt-2 text-neutral-600">Попробуй обновить страницу.</p>
        </div>
      </body>
    </html>
  );
}
