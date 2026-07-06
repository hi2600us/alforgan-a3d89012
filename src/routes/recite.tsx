import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, MicOff, Play, RefreshCcw, Square } from "lucide-react";

export const Route = createFileRoute("/recite")({
  head: () => ({
    meta: [
      { title: "اقرأ · والبرنامج يستمع ويصحّح | وقف الفرقان" },
      { name: "description", content: "برنامج تفاعلي: اختر السورة والآية أو السورة كاملة، اقرأ بصوتك، والبرنامج يستمع لك وإن أخطأت أوقفك وصحّح لك." },
      { property: "og:title", content: "اقرأ · والبرنامج يستمع" },
      { property: "og:description", content: "تدرَّب على التلاوة والتصحيح الفوري بمساعدة الذكاء الاصطناعي." },
    ],
  }),
  component: RecitePage,
});

type Surah = { number: number; name: string; englishName: string; numberOfAyahs: number };
type AyahData = { text: string; audio: string; numberInSurah: number };

type Reciter = { id: string; name: string; surahEdition: string };
const RECITERS: Reciter[] = [
  { id: "ar.alafasy", name: "مشاري العفاسي", surahEdition: "ar.alafasy" },
  { id: "ar.abdurrahmaansudais", name: "عبدالرحمن السديس", surahEdition: "ar.abdurrahmaansudais" },
  { id: "ar.husary", name: "محمود خليل الحصري", surahEdition: "ar.husary" },
];

// Normalize Arabic text for comparison
function normalize(input: string): string {
  return input
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u08D3-\u08FF]/g, "")
    .replace(/\u0640/g, "")
    .replace(/[\u0622\u0623\u0625\u0671\u0672\u0673]/g, "\u0627")
    .replace(/\u0649/g, "\u064A")
    .replace(/\u0629/g, "\u0647")
    .replace(/[\u0624\u0626]/g, "")
    .replace(/\u0621/g, "")
    .replace(/[^\u0600-\u06FF\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(s: string): string[] {
  const n = normalize(s);
  return n ? n.split(" ") : [];
}

type SRResult = { transcript: string };
type SREvent = { resultIndex: number; results: ArrayLike<ArrayLike<SRResult>> };
type SRInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: SREvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type SRCtor = new () => SRInstance;

function getSR(): SRCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: SRCtor; webkitSpeechRecognition?: SRCtor };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

type Mode = "ayah" | "surah";

function RecitePage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [surahNo, setSurahNo] = useState<number>(1);
  const [ayahNo, setAyahNo] = useState<number>(1);
  const [mode, setMode] = useState<Mode>("ayah");
  const [reciterId, setReciterId] = useState<string>(RECITERS[0].id);

  const [ayah, setAyah] = useState<AyahData | null>(null);
  const [surahText, setSurahText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [transcript, setTranscript] = useState<string>("");
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState<"idle" | "listening" | "mistake" | "done" | "error">("idle");
  const [mistakeAt, setMistakeAt] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const recRef = useRef<SRInstance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  const currentSurah = useMemo(() => surahs.find((s) => s.number === surahNo), [surahs, surahNo]);
  const reciter = useMemo(() => RECITERS.find((r) => r.id === reciterId) ?? RECITERS[0], [reciterId]);
  const targetText = mode === "ayah" ? (ayah?.text ?? "") : surahText;
  const expectedWords = useMemo(() => tokens(targetText), [targetText]);
  const spokenWords = useMemo(() => tokens(transcript), [transcript]);

  const surahAudioUrl = useMemo(
    () => `https://cdn.islamic.network/quran/audio-surah/128/${reciter.surahEdition}/${surahNo}.mp3`,
    [reciter, surahNo],
  );

  useEffect(() => {
    let alive = true;
    fetch("https://api.alquran.cloud/v1/surah")
      .then((r) => r.json())
      .then((j) => { if (alive) setSurahs((j?.data ?? []) as Surah[]); })
      .catch(() => setSurahs([]));
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (currentSurah && ayahNo > currentSurah.numberOfAyahs) setAyahNo(1);
  }, [currentSurah, ayahNo]);

  // Load selected content
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setTranscript("");
    setStatus("idle");
    setMistakeAt(null);
    (async () => {
      try {
        if (mode === "ayah") {
          const r = await fetch(`https://api.alquran.cloud/v1/ayah/${surahNo}:${ayahNo}/editions/quran-uthmani,${reciter.id}`);
          const j = await r.json();
          const arr = j?.data ?? [];
          const text = arr.find((x: { edition: { identifier: string } }) => x.edition.identifier === "quran-uthmani");
          const audio = arr.find((x: { edition: { identifier: string } }) => x.edition.identifier === reciter.id);
          if (!alive) return;
          setAyah({ text: text?.text ?? "", audio: audio?.audio ?? "", numberInSurah: text?.numberInSurah ?? ayahNo });
        } else {
          const r = await fetch(`https://api.alquran.cloud/v1/surah/${surahNo}/quran-uthmani`);
          const j = await r.json();
          const ayahs = (j?.data?.ayahs ?? []) as Array<{ text: string }>;
          if (!alive) return;
          setSurahText(ayahs.map((a) => a.text).join(" "));
        }
      } catch {
        if (alive) { setErrorMsg("تعذّر تحميل النص."); setStatus("error"); }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [mode, surahNo, ayahNo, reciter.id]);

  const stopListening = () => {
    try { recRef.current?.stop(); } catch { /* noop */ }
    setListening(false);
  };

  const releaseMic = () => {
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const playCorrection = () => {
    const src = mode === "ayah" ? ayah?.audio : surahAudioUrl;
    if (!src) return;
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = src;
    audioRef.current.play().catch(() => undefined);
  };

  const startListening = async () => {
    setErrorMsg("");
    const SR = getSR();
    if (!SR) {
      setErrorMsg("متصفحك لا يدعم التعرّف على الصوت. جرّب Chrome على الحاسوب أو الأندرويد.");
      setStatus("error");
      return;
    }
    if (!targetText) return;

    // Request mic permission first — fixes "audio-capture" errors
    if (!navigator.mediaDevices?.getUserMedia) {
      setErrorMsg("لا يمكن الوصول للميكروفون في هذا المتصفح.");
      setStatus("error");
      return;
    }
    try {
      micStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      const name = (err as { name?: string })?.name ?? "";
      if (name === "NotAllowedError") setErrorMsg("لم يتم السماح باستخدام الميكروفون. فعّل الإذن من إعدادات المتصفح.");
      else if (name === "NotFoundError") setErrorMsg("لم يتم العثور على ميكروفون متصل بالجهاز.");
      else setErrorMsg("تعذّر تشغيل الميكروفون: " + (name || "خطأ غير معروف"));
      setStatus("error");
      return;
    }

    setTranscript("");
    setMistakeAt(null);
    setStatus("listening");
    const rec = new SR();
    rec.lang = "ar-SA";
    rec.continuous = true;
    rec.interimResults = true;
    recRef.current = rec;

    rec.onresult = (e: SREvent) => {
      let full = "";
      for (let i = 0; i < e.results.length; i++) full += e.results[i][0].transcript + " ";
      setTranscript(full);
      const spoken = tokens(full);
      const exp = tokens(targetText);
      let mistake: number | null = null;
      for (let i = 0; i < spoken.length && i < exp.length; i++) {
        if (spoken[i] !== exp[i]) { mistake = i; break; }
      }
      if (mistake !== null) {
        setMistakeAt(mistake);
        setStatus("mistake");
        stopListening();
        releaseMic();
        setTimeout(playCorrection, 250);
        return;
      }
      if (spoken.length >= exp.length && exp.length > 0) {
        setStatus("done");
        stopListening();
        releaseMic();
      }
    };

    rec.onerror = (e: { error: string }) => {
      if (e.error === "audio-capture") setErrorMsg("خطأ في التعرّف: تعذّر التقاط الصوت من الميكروفون. تأكّد أن الميكروفون موصول ومسموح به لهذا الموقع.");
      else if (e.error === "not-allowed") setErrorMsg("لم يتم السماح باستخدام الميكروفون.");
      else if (e.error === "network") setErrorMsg("خطأ في الشبكة أثناء التعرّف. تأكد من الاتصال بالإنترنت.");
      else if (e.error !== "aborted" && e.error !== "no-speech") setErrorMsg(`خطأ في التعرّف: ${e.error}`);
      if (e.error !== "no-speech") setStatus("error");
      setListening(false);
      releaseMic();
    };

    rec.onend = () => { setListening(false); };

    try {
      rec.start();
      setListening(true);
    } catch {
      setErrorMsg("تعذّر بدء الاستماع.");
      setStatus("error");
      releaseMic();
    }
  };

  const reset = () => {
    stopListening();
    releaseMic();
    stopAudio();
    setTranscript("");
    setMistakeAt(null);
    setStatus("idle");
    setErrorMsg("");
  };

  useEffect(() => () => { releaseMic(); stopAudio(); }, []);

  const displayText = targetText;
  const displayWords = displayText ? displayText.split(/\s+/) : [];

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Alforgan" className="h-8 w-auto" />
            <span className="font-display text-lg text-[color:var(--emerald-deep)]">وقف الفرقان</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-[color:var(--emerald-deep)]">← الرئيسية</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 md:py-14">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold)]">تلاوة تفاعلية</p>
        <h1 className="font-display text-3xl md:text-5xl text-[color:var(--emerald-deep)] mt-3 leading-tight">
          اقرأ … والبرنامج يستمع ويصحّح
        </h1>
        <p className="mt-4 text-base text-foreground/80 leading-relaxed max-w-2xl">
          اختر السورة والآية أو السورة كاملة، ثم اضغط «ابدأ الاستماع» واقرأ بصوتٍ واضح. عند أول خطأ
          سيوقفك البرنامج ويعيد التلاوة الصحيحة بصوت القارئ الذي اخترته.
        </p>

        {/* Mode + Reciter */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">وضع القراءة</div>
            <div className="inline-flex rounded-md border border-border overflow-hidden">
              <button
                onClick={() => setMode("ayah")}
                className={`px-4 py-2 text-sm ${mode === "ayah" ? "bg-[color:var(--emerald-deep)] text-[color:var(--sand)]" : "bg-background"}`}
              >آية واحدة</button>
              <button
                onClick={() => setMode("surah")}
                className={`px-4 py-2 text-sm ${mode === "surah" ? "bg-[color:var(--emerald-deep)] text-[color:var(--sand)]" : "bg-background"}`}
              >سورة كاملة</button>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">القارئ</div>
            <div className="flex flex-wrap gap-2">
              {RECITERS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setReciterId(r.id)}
                  className={`px-3 py-1.5 text-sm rounded-md border ${reciterId === r.id ? "border-[color:var(--gold)] bg-[color:var(--sand)] text-[color:var(--emerald-deep)]" : "border-border hover:border-[color:var(--gold)]/60"}`}
                >{r.name}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Surah / Ayah pickers */}
        <div className={`mt-4 grid gap-4 rounded-xl border border-border bg-card p-5 ${mode === "ayah" ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">السورة</label>
            <select
              value={surahNo}
              onChange={(e) => setSurahNo(Number(e.target.value))}
              className="rounded-md border border-border bg-background px-3 py-2.5 text-sm"
            >
              {surahs.map((s) => (
                <option key={s.number} value={s.number}>{s.number}. {s.name} — {s.englishName}</option>
              ))}
            </select>
          </div>
          {mode === "ayah" && (
            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                رقم الآية {currentSurah && <span className="text-muted-foreground/70">(1 - {currentSurah.numberOfAyahs})</span>}
              </label>
              <input
                type="number"
                min={1}
                max={currentSurah?.numberOfAyahs ?? 300}
                value={ayahNo}
                onChange={(e) => setAyahNo(Math.max(1, Number(e.target.value) || 1))}
                className="rounded-md border border-border bg-background px-3 py-2.5 text-sm"
                dir="ltr"
              />
            </div>
          )}
          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">استماع</label>
            <button
              onClick={playCorrection}
              disabled={mode === "ayah" ? !ayah?.audio : !surahAudioUrl}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-border text-sm hover:border-[color:var(--gold)] disabled:opacity-50"
            >
              <Play size={14} /> {mode === "ayah" ? "استمع للآية" : "استمع للسورة"}
            </button>
          </div>
        </div>

        {/* Text display */}
        <div className={`mt-6 rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--sand)] p-6 md:p-8 min-h-[140px] ${mode === "surah" ? "max-h-[420px] overflow-y-auto" : ""}`}>
          {loading ? (
            <p className="text-muted-foreground text-sm">جارٍ التحميل…</p>
          ) : displayText ? (
            <p style={{ fontFamily: "Amiri, serif" }} className="text-2xl md:text-4xl leading-loose text-[color:var(--emerald-deep)] text-right">
              {displayWords.map((word, i) => {
                const spoken = spokenWords[i];
                const exp = expectedWords[i];
                let cls = "";
                if (spoken !== undefined) {
                  cls = spoken === exp ? "text-[color:var(--emerald-deep)]" : "bg-red-100 text-red-700 rounded px-1";
                } else if (mistakeAt !== null && i === mistakeAt) {
                  cls = "underline decoration-red-500 decoration-2";
                }
                return (
                  <span key={i} className={cls}>
                    {word}{i < displayWords.length - 1 ? " " : ""}
                  </span>
                );
              })}
              {mode === "ayah" && ayah && (
                <span className="text-[color:var(--gold)] mx-2">﴿{ayah.numberInSurah}﴾</span>
              )}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">اختر سورة لبدء التلاوة.</p>
          )}
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!listening ? (
            <button
              onClick={startListening}
              disabled={!displayText || loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-[color:var(--ink)] shadow-[var(--shadow-gold)] disabled:opacity-50"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Mic size={16} /> ابدأ الاستماع
            </button>
          ) : (
            <button
              onClick={() => { stopListening(); releaseMic(); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium bg-[color:var(--emerald-deep)] text-[color:var(--sand)]"
            >
              <MicOff size={16} /> إيقاف
            </button>
          )}
          <button
            onClick={stopAudio}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border text-sm hover:border-[color:var(--gold)]"
          >
            <Square size={14} /> إيقاف الصوت
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border text-sm hover:border-[color:var(--gold)]"
          >
            <RefreshCcw size={14} /> إعادة
          </button>
          {listening && (
            <span className="inline-flex items-center gap-2 text-sm text-[color:var(--emerald-deep)]">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" /> يستمع…
            </span>
          )}
        </div>

        {status === "mistake" && mistakeAt !== null && (
          <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-5 text-right">
            <p className="font-display text-lg text-red-700">توقّف — يبدو أن هناك خطأ عند الكلمة رقم {mistakeAt + 1}.</p>
            <p className="text-sm text-red-700/80 mt-1">
              الكلمة الصحيحة: <b>{displayWords[mistakeAt]}</b>. استمع الآن للتلاوة الصحيحة ثم أعد المحاولة.
            </p>
          </div>
        )}
        {status === "done" && (
          <div className="mt-6 rounded-xl border border-[color:var(--emerald-deep)]/30 bg-[color:var(--sand)] p-5">
            <p className="font-display text-lg text-[color:var(--emerald-deep)]">أحسنت! تلاوة صحيحة بإذن الله. ✓</p>
          </div>
        )}
        {status === "error" && errorMsg && (
          <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-5">
            <p className="text-sm text-red-700">{errorMsg}</p>
          </div>
        )}

        {transcript && (
          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">ما استمع إليه البرنامج</div>
            <p className="text-lg leading-loose text-foreground/85" style={{ fontFamily: "Amiri, serif" }}>{transcript}</p>
          </div>
        )}

        <p className="mt-10 text-xs text-muted-foreground leading-relaxed">
          ملاحظات: يعمل التعرّف على الصوت في متصفحات مبنية على Chrome (Chrome، Edge، Samsung Internet)
          ويحتاج إذن الوصول للميكروفون واتصالاً بالإنترنت. نصوص القرآن وصوت التلاوة من alquran.cloud
          و islamic.network.
        </p>
      </main>
    </div>
  );
}