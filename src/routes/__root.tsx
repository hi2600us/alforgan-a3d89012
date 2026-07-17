import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(var(--primary)) 0, transparent 40%), radial-gradient(circle at 80% 80%, hsl(var(--accent, var(--primary))) 0, transparent 45%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-xl text-center">
        <p
          dir="rtl"
          lang="ar"
          className="font-[Amiri,serif] text-2xl text-primary"
        >
          ﴿ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ﴾
        </p>
        <h1 className="mt-8 font-[Cormorant_Garamond,serif] text-8xl font-semibold tracking-tight text-foreground">
          404
        </h1>
        <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <h2
          dir="rtl"
          lang="ar"
          className="mt-6 font-[Amiri,serif] text-2xl text-foreground"
        >
          الصفحة غير موجودة
        </h2>
        <h2 className="mt-1 text-lg font-medium text-foreground/80">
          Page not found
        </h2>
        <p dir="rtl" lang="ar" className="mt-6 font-[Amiri,serif] text-base text-muted-foreground">
          عذرًا، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            العودة للرئيسية · Return Home
          </Link>
        </div>
        <p className="mt-10 text-xs uppercase tracking-[0.25em] text-muted-foreground/70">
          وقف الفرقان · Alforgan Endowment
        </p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "وقف الفرقان | Alforgan Endowment" },
      { name: "description", content: "وقف خيري لدعم تحفيظ القرآن الكريم ورعاية المساجد في بلقرن. A charitable endowment supporting Quran memorization and mosques in Balqarn, Saudi Arabia." },
      { name: "author", content: "Alforgan Endowment" },
      { property: "og:title", content: "وقف الفرقان | Alforgan Endowment" },
      { property: "og:description", content: "وقف خيري لدعم تحفيظ القرآن الكريم ورعاية المساجد في بلقرن. A charitable endowment supporting Quran memorization and mosques in Balqarn, Saudi Arabia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "وقف الفرقان | Alforgan Endowment" },
      { name: "twitter:description", content: "وقف خيري لدعم تحفيظ القرآن الكريم ورعاية المساجد في بلقرن. A charitable endowment supporting Quran memorization and mosques in Balqarn, Saudi Arabia." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f9ae3860-7299-457f-932e-7f86101b4afe/id-preview-5e609b49--8d590bdb-fc79-410e-9f6b-2ab225eecc60.lovable.app-1782497619710.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f9ae3860-7299-457f-932e-7f86101b4afe/id-preview-5e609b49--8d590bdb-fc79-410e-9f6b-2ab225eecc60.lovable.app-1782497619710.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
