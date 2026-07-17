import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/halaqat-interest")({
  head: () => ({
    meta: [
      { title: "سجّل اهتمامك · حلقات تحفيظ القرآن · وقف الفرقان" },
      { name: "description", content: "سجّل اهتمامك بالانضمام إلى حلقات تحفيظ القرآن الكريم القادمة في وقف الفرقان ببلقرن." },
      { property: "og:title", content: "Register interest — Alforgan Quran Circles" },
      { property: "og:description", content: "Register your interest for upcoming Quran memorization circles at Alforgan Endowment." },
    ],
  }),
  component: HalaqatInterest,
});

const FORM_ENDPOINT = "https://formsubmit.co/ajax/admin@alforgan.org";

function HalaqatInterest() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => {
      data[k] = typeof v === "string" ? v : "";
    });
    // Honeypot: silently succeed if filled
    if (data["bot-field"]) {
      setStatus("ok");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("ok");
      form.reset();
    } catch (err: unknown) {
      setErrMsg(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  };

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Alforgan" className="h-8 w-auto" />
            <span className="font-display text-lg text-[color:var(--emerald-deep)]">وقف الفرقان</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-[color:var(--emerald-deep)]">← الرئيسية</Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-14">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold)]">قريباً بإذن الله</p>
        <h1 className="font-display text-3xl md:text-5xl text-[color:var(--emerald-deep)] mt-3 leading-tight">
          سجّل اهتمامك بحلقات تحفيظ القرآن
        </h1>
        <p className="mt-4 text-base text-foreground/80 leading-relaxed">
          نستعد لافتتاح حلقات تحفيظ القرآن الكريم للنساء والأطفال في مقر وقف الفرقان بمدينة عفراء
          ببلقرن. سجّل بياناتك ليصلك إشعار بموعد بدء التسجيل وطرق الالتحاق.
        </p>

        {status === "ok" ? (
          <div className="mt-10 rounded-xl border border-[color:var(--emerald-deep)]/30 bg-[color:var(--sand)] p-8 text-center">
            <div className="text-3xl">✓</div>
            <h2 className="mt-3 font-display text-2xl text-[color:var(--emerald-deep)]">
              تم استلام تسجيلك، جزاك الله خيراً
            </h2>
            <p className="mt-2 text-sm text-foreground/70">سنتواصل معك بالتفاصيل قريباً بإذن الله.</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 px-5 py-2 rounded-md border border-border text-sm hover:border-[color:var(--gold)]"
            >
              تسجيل آخر
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-10 grid gap-5 rounded-xl border border-border bg-card p-6 md:p-8"
          >
            {/* FormSubmit configuration (sent as data, not rendered as visible fields) */}
            <input type="hidden" name="_subject" value="تسجيل اهتمام - حلقات تحفيظ القرآن" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <p hidden>
              <label>
                Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <Field label="الاسم الكامل" name="name" required />
            <Field label="البريد الإلكتروني" name="email" type="email" required />
            <Field label="رقم الجوال" name="phone" type="tel" required dir="ltr" placeholder="+9665xxxxxxxx" />
            <Field label="المدينة / الحي" name="city" />

            <div className="grid gap-2">
              <label htmlFor="track" className="text-sm font-medium text-[color:var(--emerald-deep)]">
                نوع الحلقة
              </label>
              <select
                id="track"
                name="track"
                required
                className="rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-[color:var(--gold)]"
              >
                <option value="">— اختر —</option>
                <option value="child">حلقة أطفال</option>
                <option value="adult">حلقة كبار</option>
                <option value="women">حلقة نساء</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium text-[color:var(--emerald-deep)]">
                ملاحظات (اختياري)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={1000}
                className="rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-[color:var(--gold)]"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600">تعذّر إرسال النموذج ({errMsg}). حاول مرة أخرى.</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-md font-medium text-[color:var(--ink)] shadow-[var(--shadow-gold)] disabled:opacity-60"
              style={{ background: "var(--gradient-gold)" }}
            >
              {status === "sending" ? "جارٍ الإرسال…" : "أرسل التسجيل"}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              بياناتك محفوظة ولن تُستخدم إلا للتواصل بخصوص حلقات التحفيظ.
            </p>
          </form>
        )}
      </main>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  dir,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium text-[color:var(--emerald-deep)]">
        {label} {required && <span className="text-[color:var(--gold)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        dir={dir}
        maxLength={255}
        className="rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-[color:var(--gold)]"
      />
    </div>
  );
}