import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import buildingAsset from "@/assets/furqan-building.png";
import buildingClean from "@/assets/furqan-building-clean.png";
import buildingSkeleton from "@/assets/furqan-building-skeleton.png";
import patternImg from "@/assets/pattern.jpg";
import quranImg from "@/assets/quran-study.jpg";
import mosqueImg from "@/assets/mosque-interior.jpg";
import {
  Building2,
  Hammer,
  PaintRoller,
  LayoutGrid,
  Zap,
  PanelTop,
  DoorOpen,
  Shield,
  Wind,
  Trees,
  Sofa,
  BookOpenCheck,
  Mic,
} from "lucide-react";

const worksIcons = [
  Building2,
  Hammer,
  PaintRoller,
  LayoutGrid,
  Zap,
  PanelTop,
  DoorOpen,
  Shield,
  Wind,
  Trees,
  Sofa,
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "وقف الفرقان | Alforgan Endowment — Balqarn" },
      { name: "description", content: "Support the Alforgan Waqf: finishing a hospitality complex that funds Quran memorization for girls and the upkeep of Alforgan Mosque in Balqarn, Saudi Arabia." },
      { property: "og:title", content: "وقف الفرقان | Alforgan Endowment" },
      { property: "og:description", content: "Endowment supporting Quran memorization and mosques in Balqarn, Saudi Arabia." },
      { property: "og:image", content: buildingAsset },
      { name: "twitter:image", content: buildingAsset },
    ],
  }),
  component: Index,
});

type Lang = "ar" | "en";

const t = {
  ar: {
    dir: "rtl" as const,
    nav: { about: "عن الوقف", project: "المشروع", works: "أعمال التشطيب", trustee: "النظارة", donate: "شارك في الوقف" },
    bismillah: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    eyebrow: "وقف خيري معتمد · هيئة الأوقاف بالمملكة العربية السعودية",
    heroTitle: "وقف الفرقان الخيري ودار نسائية لتحفيظ القرآن",
    heroSub: "صرحٌ وقفيٌّ ينبض بالعطاء، وشراكةٌ مجتمعية خالدة لخدمة كتاب الله وبناء الأجيال في محافظة بلقرن.",
    heroBody: "انطلاقاً من إيماننا العميق بأن الاستثمار الحقيقي هو بناء الإنسان وعمارة الأوطان، يأتي هذا الوقف الأهلي الخيري ثمرةً لجهودٍ مخلصة وعملٍ دؤوب يهدف إلى نهضة مجتمعنا. يرتكز الوقف على استثمار صرحٍ معماري في مدينة عفراء بمحافظة بلقرن، ليُوجه ريعه بالكامل لدعم \"جمعية تحفيظ القرآن الكريم\" وتلبية كافة احتياجات \"جامع الفرقان\".\n\nلقد تكاتفت الجهود وتواصلت مسيرة البناء حتى وصلنا اليوم إلى مشارف النهاية لمرحلة التأسيس الشاقة. وبخطواتٍ واثقة نحو التشغيل، نهدف لأن يكون هذا الوقف منارةً ذاتية الاستدامة، تفيض بالخير دون الحاجة لأي تبرعات مستقبلية. عطاؤك اليوم هو حجر الزاوية الذي يُتوج هذا العمل المجتمعي العظيم.",
    donateCta: "ساهم في الأثر",
    learn: "تعرف على الوقف",
    certNo: "رقم الشهادة الوقفية",
    deedNo: "رقم الصك",
    deedDate: "تاريخ الصك",
    naziraNo: "صك النظارة",
    permitNo: "رقم تصريح جمع التبرعات",
    permitPending: "قيد الاستخراج",
    sustainKicker: "وقفٌ ذاتيُّ الاستدامة",
    sustainTitle: "مساهمةٌ واحدة · أثرٌ دائم",
    sustainBody: "الوقف الآن في مرحلته الأخيرة قبل الاكتمال. بعد التشغيل ستُموِّل إيراداتُ المبنى تحفيظ القرآن وعمارة المسجد ذاتيًّا، دون الحاجة لأي مساهمات مستقبلية. شراكتك اليوم بذرةٌ تُثمر صدقةً جاريةً جيلًا بعد جيل.",
    locationKicker: "الموقع",
    locationTitle: "موقع المشروع على الخريطة",
    locationAddress: "JXWX+9V Sabt Al Alayah",
    aboutKicker: "عن الوقف",
    aboutTitle: "وقف الفرقان الخيري ودار نسائية لتحفيظ القرآن",
    aboutBody: "أُسس هذا الصرح المبارك بفضل الله ثم بفضل بصيرة ويدٍ معطاءة للشيخ عبدالله بن سعد بن حنش القرني (رحمه الله)، الذي جسّد أسمى معاني البذل والإحسان حين أوقف هذا المبنى. لقد ترك خلفه إرثاً مجتمعياً لا ينضب، ومسيرة خيرٍ تمتد أجورها إلى يوم الدين، ليكون نموذجاً يُحتذى به في تفريج الكربات وحب الخير للمجتمع.",
    masrifTitle: "المصرف",
    masrifBody: "استثمار العمارة لصالح جمعية تحفيظ القرآن الكريم ببلقرن، والإنفاق على حاجات جامع الفرقان الواقع شرق المبنى.",
    projectKicker: "المشروع",
    projectTitle: "مجمّع الفرقان متعدد الاستخدامات",
    projectBody: "مبنى فندقي · حضانة تعليمية · كافيه · استقبال وجلسات — في مدينة عفراء بمحافظة بلقرن، منطقة عسير، المملكة العربية السعودية.",
    components: [
      { t: "مبنى فندقي", d: "أجنحة وغرف فندقية لخدمة زوار المنطقة وتوليد دخل وقفي مستدام." },
      { t: "حضانة تعليمية", d: "حضانة مخصصة لتأسيس الناشئة على القرآن الكريم في بيئة آمنة." },
      { t: "كافيه واستقبال", d: "مساحات اجتماعية لخدمة المجتمع وتنمية الإيراد الوقفي." },
      { t: "جامع الفرقان", d: "الإنفاق على حاجات الجامع الواقع شرق المبنى وصيانته." },
    ],
    worksKicker: "احتياجات التشطيب",
    worksTitle: "أعمالٌ تكتمل بشراكتكم",
    worksList: [
      "استكمال أعمال المباني (الواجهات والتعديلات الداخلية)",
      "التعديلات المعمارية وأعمال التكسير والترميم",
      "أعمال اللياسة والدهانات",
      "الأرضيات والحوائط (سيراميك، بورسلين، رخام)",
      "الأعمال الكهربائية والصحية",
      "الأسقف المستعارة والجبس بورد",
      "أعمال الأبواب والنوافذ",
      "أعمال العزل",
      "أعمال التكييف والميكانيكا",
      "أعمال الموقع العام",
      "توريد الأثاث والفرش",
    ],
    impactKicker: "أثر صدقتك",
    impactTitle: "صدقةٌ جاريةٌ لا ينقطع أجرها",
    impactBody: "أيها الباذل للخير، إن مساهمتك في هذا الوقف ليست مجرد إنفاق مالي، بل هي تجارةٌ رابحة مع الله، وتجسيدٌ لنبل أخلاقك، واستشعارٌ لمسؤوليتك العظيمة تجاه مجتمعك. كل ريال تجود به هو لبنةٌ تُبنى، وآيةٌ تُتلى، ونورٌ يضيء دروب الأجيال القادمة",
    impactStats: [
      { v: "11", l: "بنداً من أعمال التشطيبات" },
      { v: "1", l: "وقفٌ ينفع جيلاً بعد جيل" },
      { v: "∞", l: "أجرٌ جارٍ بإذن الله" },
    ],
    trusteeKicker: "الناظر على الوقف",
    trusteeTitle: "حوكمة الوقف",
    trusteeBody: "حملت ذرية الواقف هذه الأمانة العظيمة لتواصل مسيرة الخير من خلال \"مجلس نظارة\" يعمل بجد وإخلاص، ويسهر على إدارة الوقف وتنمية موارده بشفافية تامة ومسؤولية أمام الله، ثم أمام الهيئة العامة للأوقاف.",
    contact: "تواصل",
    location: "مدينة عفراء، محافظة بلقرن، منطقة عسير، المملكة العربية السعودية",
    footerRights: "© وقف الفرقان · جميع الحقوق محفوظة",
    donateTitle: "شارك في إكمال وقف الفرقان",
    donateBody: "طوبى لمن جعل ماله خادماً لكتاب الله وسبباً في نفع الناس. شارك في إكمال وقف الفرقان؛ فمساهمتك اليوم لمرة واحدة ستُثمر عطاءً مجتمعياً مستداماً لك ولمن تحب. لتفاصيل التحويل أو الشراكة في إكمال أعمال التشطيب، يُرجى التواصل مع مجلس النظارة.",
    trusteeName: "الناظر",
    trusteeRole: "ناظر الوقف",
    trusteePhone: "هاتف الناظر",
    trusteeEmail: "البريد الإلكتروني",
    bankTitle: "قنوات المساهمة",
    bankName: "اسم البنك",
    bankAccount: "اسم الحساب",
    bankIban: "رقم الآيبان",
    bankNote: "يُرجى التواصل مع مجلس النظارة لتأكيد التحويل واستلام الإيصال.",
    timelineKicker: "الجدول الزمني",
    timelineTitle: "المرحلة الحالية: الهيكل الإنشائي",
    timelineBody: "بعد أيامٍ وليالٍ من العمل المتواصل والتفاني لتخطي الصعاب الإنشائية، تكللت جهودنا بإنجاز الهيكل الخرساني بالكامل، ليكون الأساس المتين لهذا المشروع. وبعون الله ثم بدعمكم، نطمح لإنجاز ما تبقى خلال عامٍ واحد ليرى هذا الحلم النور.",
    timelineSteps: [
      { t: "المرحلة الأولى", d: "الهيكل الإنشائي (مكتمل)", s: "done" },
      { t: "المرحلة الثانية", d: "أعمال التشطيب الداخلي والخارجي", s: "now" },
      { t: "المرحلة الثالثة", d: "التكييف والكهرباء والميكانيكا", s: "next" },
      { t: "المرحلة الرابعة", d: "الأثاث والفرش والتسليم والتشغيل", s: "next" },
    ],
    timelineEta: "المدة المتوقعة للإنجاز: سنة واحدة",
    partnersKicker: "شركاؤنا والجهات الداعمة",
    partnersTitle: "بدعم وإشراف من",
    partners: [
      { name: "الهيئة العامة للأوقاف", role: "الجهة المُشرفة", url: "https://awqaf.gov.sa/ar" },
      { name: "جمعية تلاوة لتحفيظ القرآن الكريم ببلقرن", role: "الجهة المستفيدة", url: "https://www.quran-balqarn.org.sa/" },
      { name: "Goodstack", role: "المنصة الدولية للقطاع غير الربحي", url: "https://goodstack.org" },
    ],
  },
  en: {
    dir: "ltr" as const,
    nav: { about: "About", project: "Project", works: "Works", trustee: "Trustee", donate: "Contribute" },
    bismillah: "In the name of Allah, the Most Gracious, the Most Merciful",
    eyebrow: "Certified Charitable Endowment · General Authority of Awqaf, KSA",
    heroTitle: "Alforgan Endowment",
    heroSub: "A lasting endowment partnership for the Quran and the mosques of Balqarn.",
    heroBody: "A family waqf investing the endowed building in Afra, Balqarn, for the benefit of the Balqarn Quran Memorization Society and the upkeep of Alforgan Mosque. The endowment is now in its final phase before completion. Once operational, it will become fully self-sustaining and will not require any future contributions — your contribution today is a one-time seed for a permanent, self-funding impact.",
    donateCta: "Join the impact",
    learn: "Learn about the waqf",
    certNo: "Waqf Certificate No.",
    deedNo: "Deed No.",
    deedDate: "Deed Date",
    naziraNo: "Trusteeship Deed",
    permitNo: "Fundraising Permit No.",
    permitPending: "Pending issuance",
    sustainKicker: "A self-sustaining endowment",
    sustainTitle: "One contribution · lasting legacy",
    sustainBody: "The endowment is in its final development phase. Once completed, the building's income will perpetually fund Quran memorization and mosque care on its own — no further donations needed. Your partnership today plants a seed that gives, generation after generation.",
    locationKicker: "Location",
    locationTitle: "Project location on the map",
    locationAddress: "JXWX+9V Sabt Al Alayah",
    aboutKicker: "About the waqf",
    aboutTitle: "Alforgan Charitable Endowment & Women's Quran Memorization House",
    aboutBody: "This blessed edifice was founded by the grace of God, and then through the vision and generous hand of Sheikh Abdullah bin Saad bin Hanash Al-Qarni (may God have mercy on him), who embodied the highest meanings of giving and benevolence when he endowed this building. He left behind an inexhaustible legacy for the community and a journey of goodness whose rewards extend to the Day of Judgment — a model to be followed in relieving hardship and loving good for society.",
    masrifTitle: "Beneficiary",
    masrifBody: "Investment of the building for the benefit of the Balqarn Quran Memorization Charitable Society, and to spend on the needs of Alforgan Mosque located east of the building.",
    projectKicker: "The project",
    projectTitle: "Alforgan Mixed-Use Complex",
    projectBody: "Hospitality building · Educational nursery · Café · Reception lounges — in the city of Afra, Balqarn Governorate, Asir Region, Saudi Arabia.",
    components: [
      { t: "Hospitality Building", d: "Hotel suites and rooms serving visitors and generating sustainable waqf income." },
      { t: "Educational Nursery", d: "A nursery dedicated to grounding young children in the Holy Quran in a safe environment." },
      { t: "Café & Reception", d: "Community spaces that serve the region and grow the endowment's revenue." },
      { t: "Alforgan Mosque", d: "Funding the needs and maintenance of the mosque located east of the building." },
    ],
    worksKicker: "Finishing needs",
    worksTitle: "Works completed through your partnership",
    worksList: [
      "Completion of building works (facades and interior adjustments)",
      "Architectural modifications, demolition and renovation",
      "Plastering and painting",
      "Floors and walls (ceramic, porcelain, marble)",
      "Electrical and plumbing works",
      "False ceilings and gypsum board",
      "Doors and windows",
      "Insulation works",
      "HVAC and mechanical works",
      "Site works",
      "Furniture and furnishings supply",
    ],
    impactKicker: "Your impact",
    impactTitle: "A continuing charity, ever-flowing",
    impactBody: "Every riyal contributed to complete this building becomes a perpetual, self-sustaining return that funds the memorization of the Quran and the care of Allah's houses — one contribution, an ongoing reward, by His will.",
    impactStats: [
      { v: "11", l: "finishing work items" },
      { v: "1", l: "endowment serving generations" },
      { v: "∞", l: "ongoing reward, inshaAllah" },
    ],
    trusteeKicker: "Trustee",
    trusteeTitle: "From the founder's descendants",
    trusteeBody: "Per the founder's condition, trusteeship is held by a descendant. The trustee board is accountable before Allah, then before the General Authority of Awqaf, for the sound management of the waqf and the sustainability of its purpose.",
    contact: "Contact",
    location: "Afra City, Balqarn Governorate, Asir Region, Kingdom of Saudi Arabia",
    footerRights: "© Alforgan Endowment · All rights reserved",
    donateTitle: "Contribute to complete Alforgan Endowment",
    donateBody: "Your contribution today is a one-time seed in an endowment that will become self-sustaining after completion. For transfer details or partnership in finishing the works, please contact the trustee board.",
    trusteeName: "Trustee",
    trusteeRole: "Waqf Trustee",
    trusteePhone: "Trustee phone",
    trusteeEmail: "Email",
    bankTitle: "Contribution channels",
    bankName: "Bank",
    bankAccount: "Account name",
    bankIban: "IBAN",
    bankNote: "Please contact the trustee board to confirm your transfer and receive a receipt.",
    timelineKicker: "Project timeline",
    timelineTitle: "Current phase: Structural skeleton",
    timelineBody: "The concrete skeleton is complete. Within one year, inshaAllah, the finishing works conclude and operations begin — at which point the endowment becomes fully self-sustaining on its own income.",
    timelineSteps: [
      { t: "Phase 1", d: "Structural skeleton (completed)", s: "done" },
      { t: "Phase 2", d: "Interior & exterior finishing works", s: "now" },
      { t: "Phase 3", d: "HVAC, electrical & mechanical", s: "next" },
      { t: "Phase 4", d: "Furniture, handover & operation", s: "next" },
    ],
    timelineEta: "Expected completion: one year",
    partnersKicker: "Partners & supporting bodies",
    partnersTitle: "Under the supervision and support of",
    partners: [
      { name: "General Authority of Awqaf", role: "Supervisory authority", url: "https://awqaf.gov.sa/ar" },
      { name: "Tilawah Quran Memorization Society — Balqarn", role: "Beneficiary society", url: "https://www.quran-balqarn.org.sa/" },
      { name: "Goodstack", role: "International donation platform", url: "https://goodstack.org" },
    ],
  },
};

function Index() {
  const [lang, setLang] = useState<Lang>("ar");
  const L = t[lang];
  const isRtl = lang === "ar";

  return (
    <div dir={L.dir} lang={lang} className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.png" alt="Alforgan logo" className="h-10 w-auto" />
            <div className="leading-tight">
              <div className="font-display text-xl text-[color:var(--emerald-deep)]">{L.heroTitle}</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{lang === "ar" ? "وقف خيري" : "Charitable Waqf"}</div>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#about" className="hover:text-[color:var(--emerald-deep)] transition">{L.nav.about}</a>
            <a href="#project" className="hover:text-[color:var(--emerald-deep)] transition">{L.nav.project}</a>
            <a href="#works" className="hover:text-[color:var(--emerald-deep)] transition">{L.nav.works}</a>
            <a href="#timeline" className="hover:text-[color:var(--emerald-deep)] transition">{isRtl ? "الجدول الزمني" : "Timeline"}</a>
            <a href="#partners" className="hover:text-[color:var(--emerald-deep)] transition">{isRtl ? "الشركاء" : "Partners"}</a>
            <a href="#trustee" className="hover:text-[color:var(--emerald-deep)] transition">{L.nav.trustee}</a>
            <a href="/recite/" title="تلاوة تفاعلية" aria-label="تلاوة تفاعلية" className="hover:text-[color:var(--emerald-deep)] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/halaqat-interest"
              aria-label={isRtl ? "سجّل اهتمامك بحلقات تحفيظ القرآن" : "Register interest — Quran circles"}
              title={isRtl ? "سجّل اهتمامك بحلقات التحفيظ" : "Register interest — Quran circles"}
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:border-[color:var(--gold)] hover:text-[color:var(--emerald-deep)] transition"
            >
              <BookOpenCheck size={16} />
            </Link>
            <Link
              to="/recite"
              aria-label={isRtl ? "اقرأ والبرنامج يستمع" : "Recite — the app listens"}
              title={isRtl ? "اقرأ والبرنامج يستمع ويصحّح" : "Recite — the app listens & corrects"}
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:border-[color:var(--gold)] hover:text-[color:var(--emerald-deep)] transition"
            >
              <Mic size={16} />
            </Link>
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="text-xs font-medium tracking-wider uppercase px-3 py-2 rounded-md border border-border hover:border-[color:var(--gold)] transition"
            >
              {lang === "ar" ? "EN" : "عربي"}
            </button>
            <a href="#donate" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium text-[color:var(--ink)] shadow-[var(--shadow-gold)]" style={{ background: "var(--gradient-gold)" }}>
              {L.nav.donate}
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{ backgroundImage: `url(${patternImg})`, backgroundSize: "400px" }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-20 lg:pt-28 lg:pb-36">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-[color:var(--sand)]">
              <p className="font-arabic text-[color:var(--gold-soft)] text-lg mb-6" style={{ fontFamily: "var(--font-arabic)" }}>
                {L.bismillah}
              </p>
              <p className="text-xs tracking-[0.3em] uppercase text-[color:var(--gold-soft)]/80 mb-5">{L.eyebrow}</p>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-5">
                {L.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-[color:var(--sand)]/90 max-w-xl mb-5 font-display italic">
                {L.heroSub}
              </p>
              <p className="text-[color:var(--sand)]/75 max-w-xl leading-relaxed mb-10">{L.heroBody}</p>
              <div className="flex flex-wrap gap-4">
                <a href="#donate" className="px-7 py-3.5 rounded-md font-medium text-[color:var(--ink)] shadow-[var(--shadow-gold)] hover:translate-y-[-1px] transition" style={{ background: "var(--gradient-gold)" }}>
                  {L.donateCta}
                </a>
                <a href="#about" className="px-7 py-3.5 rounded-md font-medium border border-[color:var(--gold-soft)]/40 text-[color:var(--sand)] hover:bg-white/5 transition">
                  {L.learn}
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-6 rounded-2xl opacity-30 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
              <div className="relative flex items-end justify-center min-h-[420px]">
                <img
                  src={buildingClean}
                  alt="Alforgan endowment building rendering in Balqarn"
                  className="w-full h-auto block drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]"
                  width={662}
                  height={610}
                />
                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                  <span className="px-4 py-1.5 rounded-full text-[10px] tracking-[0.25em] uppercase text-[color:var(--ink)] font-medium" style={{ background: "var(--gradient-gold)" }}>
                    {lang === "ar" ? "التصور النهائي للمشروع" : "Final project rendering"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <Kicker>{L.aboutKicker}</Kicker>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-[color:var(--emerald-deep)] mt-4 font-medium">
              {L.aboutTitle}
            </h2>
            <div className="mt-8 rounded-lg overflow-hidden border border-border aspect-[16/9]">
              <img src={quranImg} alt="A young woman reciting the Quran" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pt-20">
            <p className="text-lg leading-loose text-foreground/85">{L.aboutBody}</p>

            <div className="mt-10 rounded-2xl p-8 border border-[color:var(--gold)]/30 bg-[color:var(--sand)] relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url(${patternImg})`, backgroundSize: "260px" }} />
              <div className="relative">
                <Kicker accent>{L.masrifTitle}</Kicker>
                <p className="mt-3 text-lg leading-relaxed text-[color:var(--emerald-deep)] font-display">{L.masrifBody}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl p-8 border border-[color:var(--emerald-deep)]/20 bg-[color:var(--emerald-deep)] text-[color:var(--sand)] relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url(${patternImg})`, backgroundSize: "260px" }} />
              <div className="relative">
                <Kicker accent light>{L.sustainKicker}</Kicker>
                <h3 className="font-display text-xl md:text-2xl mt-3 text-[color:var(--gold-soft)]">{L.sustainTitle}</h3>
                <p className="mt-3 text-base leading-relaxed text-[color:var(--sand)]/85">{L.sustainBody}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROJECT */}
      <section id="project" className="py-14 md:py-20 lg:py-28 bg-[color:var(--sand)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url(${patternImg})`, backgroundSize: "320px" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <Kicker>{L.projectKicker}</Kicker>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[color:var(--emerald-deep)] mt-4 leading-tight font-medium">{L.projectTitle}</h2>
            <p className="mt-5 text-lg text-foreground/80 leading-relaxed">{L.projectBody}</p>
          </div>

          <div className="mt-10 md:mt-14 -mx-6 md:mx-0 px-6 md:px-0 flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-pl-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {L.components.map((c, i) => (
              <div key={i} className="group shrink-0 w-[78%] sm:w-[55%] md:w-auto snap-start bg-card rounded-lg p-6 md:p-7 border border-border hover:border-[color:var(--gold)] hover:shadow-[var(--shadow-elegant)] transition-all">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center text-[color:var(--ink)] font-display text-lg" style={{ background: "var(--gradient-gold)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl md:text-2xl mt-5 text-[color:var(--emerald-deep)]">{c.t}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="py-14 md:py-20 lg:py-28 bg-[color:var(--sand)]/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <Kicker>{L.timelineKicker}</Kicker>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[color:var(--emerald-deep)] mt-4 leading-tight font-medium">{L.timelineTitle}</h2>
            <p className="mt-5 text-lg text-foreground/80 leading-relaxed">{L.timelineBody}</p>
          </div>
          <ol className="mt-10 md:mt-14 -mx-6 md:mx-0 px-6 md:px-0 flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-pl-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {L.timelineSteps.map((step, i) => {
              const isDone = step.s === "done";
              const isNow = step.s === "now";
              return (
                <li key={i} className={`shrink-0 w-[78%] sm:w-[55%] md:w-auto snap-start relative rounded-lg p-6 md:p-7 border bg-card transition ${isNow ? "border-[color:var(--gold)] shadow-[var(--shadow-elegant)]" : "border-border"}`}>
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-display ${
                        isDone
                          ? "bg-[color:var(--emerald-deep)] text-[color:var(--sand)]"
                          : isNow
                          ? "text-[color:var(--ink)]"
                          : "bg-muted text-muted-foreground"
                      }`}
                      style={isNow ? { background: "var(--gradient-gold)" } : undefined}
                      dir="ltr"
                    >
                      {isDone ? "✓" : String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                      {isDone ? (isRtl ? "مكتمل" : "Done") : isNow ? (isRtl ? "قيد التنفيذ" : "In progress") : (isRtl ? "قادم" : "Upcoming")}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl mt-5 text-[color:var(--emerald-deep)]">{step.t}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{step.d}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-10 md:mt-12 grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-lg overflow-hidden border border-[color:var(--gold)]/30 bg-card aspect-[16/9]">
              <img
                src={buildingSkeleton}
                alt={isRtl ? "صورة الموقع: المرحلة الإنشائية الحالية" : "On-site photo: current structural phase"}
                loading="lazy"
                width={1408}
                height={792}
                className="w-full h-full object-cover block"
              />
              <div className={`absolute top-3 ${isRtl ? "right-3" : "left-3"} inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color:var(--emerald-deep)] text-[color:var(--sand)] text-[10px] tracking-[0.25em] uppercase`}>
                {isRtl ? "صورة من الموقع · المرحلة الحالية" : "On site · current phase"}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isRtl
                  ? "الصورة أعلاه من الموقع توضّح اكتمال الهيكل الإنشائي للمبنى، وهو الأساس الذي ستبنى عليه أعمال التشطيب القادمة."
                  : "The on-site photo above shows the completed concrete skeleton — the foundation on which all upcoming finishing works will be built."}
              </p>
              <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-full border border-[color:var(--gold)]/40 bg-card">
                <span className="w-2 h-2 rounded-full bg-[color:var(--gold)] animate-pulse" />
                <span className="text-sm text-[color:var(--emerald-deep)] font-display">{L.timelineEta}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="works" className="py-12 md:py-16 lg:py-20 bg-[color:var(--sand)]/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <Kicker>{L.worksKicker}</Kicker>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[color:var(--emerald-deep)] mt-3 leading-tight font-medium">{L.worksTitle}</h2>
            </div>
            <a href="#donate" className="self-start inline-flex px-5 py-2.5 rounded-md text-sm font-medium text-[color:var(--ink)] shadow-[var(--shadow-gold)] whitespace-nowrap" style={{ background: "var(--gradient-gold)" }}>
              {L.donateCta}
            </a>
          </div>
          {/* Mobile accordion */}
          <details className="sm:hidden group rounded-lg border border-border/70 bg-card/70 backdrop-blur-sm">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-display text-[color:var(--emerald-deep)] list-none">
              <span>{isRtl ? "عرض بنود التشطيب (١١)" : "View all 11 items"}</span>
              <span className="text-[color:var(--gold)] group-open:rotate-180 transition">▾</span>
            </summary>
            <ul className="px-2 pb-3 grid gap-2">
              {L.worksList.map((w, i) => {
                const Icon = worksIcons[i] ?? Building2;
                return (
                  <li key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[color:var(--emerald-deep)]/15 text-[color:var(--emerald-deep)] bg-[color:var(--sand)]/60">
                      <Icon size={14} strokeWidth={1.75} />
                    </span>
                    <span className="text-sm text-foreground/90 leading-snug">{w}</span>
                  </li>
                );
              })}
            </ul>
          </details>
          <ul className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {L.worksList.map((w, i) => {
              const Icon = worksIcons[i] ?? Building2;
              return (
                <li
                  key={i}
                  className="group relative flex items-center gap-3 rounded-lg border border-border/70 bg-card/70 backdrop-blur-sm px-4 py-3 hover:border-[color:var(--gold)] hover:shadow-[var(--shadow-elegant)] transition-all"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[color:var(--emerald-deep)]/15 text-[color:var(--emerald-deep)] bg-[color:var(--sand)]/60 group-hover:bg-[color:var(--emerald-deep)] group-hover:text-[color:var(--sand)] transition-colors"
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] tracking-[0.2em] text-[color:var(--gold)] font-display tabular-nums" dir="ltr">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block text-sm text-foreground/90 leading-snug">{w}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="partners" className="py-14 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <Kicker>{L.partnersKicker}</Kicker>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[color:var(--emerald-deep)] mt-4 leading-tight font-medium">{L.partnersTitle}</h2>
          </div>
          <div className="mt-10 md:mt-12 -mx-6 md:mx-0 px-6 md:px-0 flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-pl-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {L.partners.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group shrink-0 w-[78%] sm:w-[55%] md:w-auto snap-start rounded-lg p-6 md:p-7 border border-border bg-card hover:border-[color:var(--gold)] hover:shadow-[var(--shadow-elegant)] transition-all flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-[color:var(--emerald-deep)]/20 bg-[color:var(--sand)]">
                  <PartnerGlyph index={i} />
                </div>
                <h3 className="font-display text-xl md:text-2xl mt-5 text-[color:var(--emerald-deep)] leading-snug">{p.name}</h3>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{p.role}</p>
                <span className="mt-5 text-xs text-[color:var(--gold)] group-hover:underline" dir="ltr">
                  {new URL(p.url).hostname.replace(/^www\./, "")} ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-14 md:py-20 lg:py-28 bg-[color:var(--sand)]/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <Kicker>{L.locationKicker}</Kicker>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[color:var(--emerald-deep)] mt-4 leading-tight font-medium">{L.locationTitle}</h2>
            <p className="mt-5 text-base text-foreground/80 leading-relaxed">{L.locationAddress}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("JXWX+9V Sabt Al Alayah")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-8 px-6 py-3 rounded-md font-medium text-[color:var(--ink)] shadow-[var(--shadow-gold)]"
              style={{ background: "var(--gradient-gold)" }}
            >
              {isRtl ? "افتح في خرائط جوجل" : "Open in Google Maps"}
            </a>
          </div>
          <div className="lg:col-span-7 rounded-lg overflow-hidden border border-border shadow-[var(--shadow-elegant)] aspect-[16/9]">
            <iframe
              title="Alforgan Waqf location"
              src={`https://www.google.com/maps?q=${encodeURIComponent("JXWX+9V Sabt Al Alayah")}&output=embed`}
              width="100%"
              height="100%"
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="relative py-14 md:py-20 lg:py-28 overflow-hidden">
        <img src={mosqueImg} alt="" loading="lazy" width={1024} height={1024} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.18 0.04 160 / 0.92), oklch(0.22 0.06 160 / 0.88))" }} />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center text-[color:var(--sand)]">
          <Kicker accent>{L.impactKicker}</Kicker>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mt-5 leading-tight font-medium">{L.impactTitle}</h2>
          <p className="mt-6 text-lg text-[color:var(--sand)]/80 max-w-2xl mx-auto leading-relaxed">{L.impactBody}</p>
          <div className="mt-14 grid grid-cols-3 gap-4 md:gap-10">
            {L.impactStats.map((s, i) => (
              <div key={i}>
                <div className="font-display text-5xl md:text-6xl text-[color:var(--gold-soft)]">{s.v}</div>
                <div className="text-xs md:text-sm text-[color:var(--sand)]/70 mt-2 tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENT — HALAQAT & RECITATION */}
      <section id="announcement" className="py-6 bg-[color:var(--emerald-deep)] text-[color:var(--sand)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl shrink-0">🎤</span>
            <div>
              <p className="font-display text-lg md:text-xl font-medium">
                {isRtl ? "قريباً بإذن الله: حلقات تحفيظ القرآن الكريم" : "Coming soon, inshaAllah: Quran memorization circles"}
              </p>
              <p className="text-sm text-[color:var(--sand)]/80 mt-0.5">
                {isRtl
                  ? "اقرأ والبرنامج يستمع؛ إن أخطأت أوقفك وصحّح التلاوة فوراً."
                  : "Recite and the program listens; if you make a mistake it stops and corrects you instantly."}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex flex-wrap gap-2 justify-center">
            <Link to="/halaqat-interest" className="inline-flex px-5 py-2 rounded-full font-medium text-[color:var(--emerald-deep)] bg-[color:var(--sand)] hover:bg-white transition-colors text-sm">
              {isRtl ? "سجّل اهتمامك" : "Register interest"}
            </Link>
            <Link to="/recite" className="inline-flex px-5 py-2 rounded-full font-medium border border-[color:var(--gold-soft)]/50 text-[color:var(--sand)] hover:bg-white/10 transition-colors text-sm">
              {isRtl ? "جرّب: اقرأ ويستمع" : "Try: Recite & listen"}
            </Link>
          </div>
        </div>
      </section>

      {/* TRUSTEE + DONATE */}
      <section id="trustee" className="py-14 md:py-20 lg:py-28 bg-[color:var(--sand)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          <div className="rounded-lg p-8 md:p-10 lg:p-12 bg-card border border-border">
            <Kicker>{L.trusteeKicker}</Kicker>
            <h3 className="font-display text-2xl md:text-3xl text-[color:var(--emerald-deep)] mt-3">{L.trusteeTitle}</h3>
            <p className="mt-6 text-base text-foreground/80 leading-relaxed">{L.trusteeBody}</p>
            <dl className="mt-8 pt-8 border-t border-border grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{L.trusteeRole}</dt>
                <dd className="font-display text-base text-[color:var(--emerald-deep)]">{isRtl ? "من ذرية الواقف" : "From the founder's descendants"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{L.trusteePhone}</dt>
                <dd className="font-display text-base text-[color:var(--emerald-deep)]" dir="ltr">+966 50 560 9022</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{L.trusteeEmail}</dt>
                <dd className="font-display text-base text-[color:var(--emerald-deep)]" dir="ltr">admin@alforgan.org</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{L.contact}</dt>
                <dd className="text-foreground/80 text-xs leading-relaxed">{L.location}</dd>
              </div>
            </dl>
          </div>

          <div id="donate" className="rounded-lg p-8 md:p-10 lg:p-12 relative overflow-hidden text-[color:var(--sand)]" style={{ background: "var(--gradient-hero)" }}>
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${patternImg})`, backgroundSize: "300px" }} />
            <div className="relative">
              <Kicker accent light>{L.nav.donate}</Kicker>
              <h3 className="font-display text-2xl md:text-3xl mt-3">{L.donateTitle}</h3>
              <p className="mt-5 text-[color:var(--sand)]/80 leading-relaxed">{L.donateBody}</p>
              <div className="mt-8 rounded-xl border border-[color:var(--gold-soft)]/30 bg-black/20 backdrop-blur-sm p-6 space-y-4">
                <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold-soft)]">{L.bankTitle}</div>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                    <span className="text-[color:var(--sand)]/60">{L.bankName}</span>
                    <span className="font-display text-[color:var(--sand)]" dir="ltr">مصرف الراجحي</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                    <span className="text-[color:var(--sand)]/60">{L.bankAccount}</span>
                    <span className="font-display text-[color:var(--sand)] text-right">{isRtl ? "وقف الفرقان الخيري ودار نسائية لتحفيظ القرآن\u00a0" : "Alforgan Charitable Endowment"}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[color:var(--sand)]/60">{L.bankIban}</span>
                    <span className="font-display text-[color:var(--sand)] tabular-nums" dir="ltr">SA58 8000 0463 6080 1691 8344</span>
                  </div>
                </div>
                <p className="text-xs text-[color:var(--sand)]/60 leading-relaxed pt-2 border-t border-white/10">{L.bankNote}</p>
              </div>
              <a href={`mailto:admin@alforgan.org`} className="inline-flex mt-6 px-7 py-3.5 rounded-md font-medium text-[color:var(--ink)] shadow-[var(--shadow-gold)]" style={{ background: "var(--gradient-gold)" }}>
                {isRtl ? "تواصل مع الناظر" : "Contact the trustee"}
              </a>
              <p className="mt-6 text-xs text-[color:var(--sand)]/60 leading-relaxed">
                {lang === "ar"
                  ? "«مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ في كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ»"
                  : "“The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes; in each spike is a hundred grains.”"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row gap-6 items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Alforgan logo" className="h-8 w-auto" />
            <span className="font-display text-base text-[color:var(--emerald-deep)]">{L.heroTitle}</span>
          </div>
          <div className="text-xs">{L.footerRights}</div>
          <div className="text-xs flex flex-col md:items-end gap-1">
            <span dir="ltr">{L.certNo}: 1112506318</span>
            <span>{L.permitNo}: {L.permitPending}</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-6 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground leading-relaxed">
          <p>موقع alforgan.org مملوك ومُشغَّل من قِبل: وقف الفرقان الخيري ودار النسائية لتحفيظ القران — منظمة غير ربحية مسجلة، رقم التسجيل: 1112506318 — عفراء، بلقرن، المملكة العربية السعودية</p>
          <p className="mt-1" dir="ltr">alforgan.org is owned and operated by Waqf Alforgan Charitable Endowment &amp; Women's Quran Memorization House — a registered nonprofit organization, Registration ID: 1112506318 — Afra, Balqarn, Saudi Arabia.</p>
        </div>
      </footer>
    </div>
  );
}

function Kicker({ children, accent, light }: { children: React.ReactNode; accent?: boolean; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className={`h-px w-8 ${accent ? "bg-[color:var(--gold)]" : light ? "bg-white/40" : "bg-[color:var(--emerald-deep)]/40"}`} />
      <span className={`text-[10px] tracking-[0.3em] uppercase ${light ? "text-[color:var(--gold-soft)]" : accent ? "text-[color:var(--gold)]" : "text-[color:var(--emerald-deep)]"}`}>
        {children}
      </span>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded-lg px-4 py-3 bg-card flex items-center justify-between gap-4">
      <dt className="text-[11px] uppercase tracking-widest text-muted-foreground shrink-0">{label}</dt>
      <dd className="font-display text-sm md:text-base text-[color:var(--emerald-deep)] truncate" dir="ltr">{value}</dd>
    </div>
  );
}

function Mark({ small }: { small?: boolean }) {
  const size = small ? 32 : 44;
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden>
      <rect x="1" y="1" width="42" height="42" rx="8" stroke="url(#g)" strokeWidth="1.5" />
      <path d="M22 8 L34 16 V28 L22 36 L10 28 V16 Z" stroke="url(#g)" strokeWidth="1.2" fill="none" />
      <circle cx="22" cy="22" r="4" fill="url(#g)" />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="44" y2="44">
          <stop offset="0%" stopColor="oklch(0.82 0.12 85)" />
          <stop offset="100%" stopColor="oklch(0.32 0.07 160)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PartnerGlyph({ index }: { index: number }) {
  const stroke = "var(--emerald-deep)";
  if (index === 0) {
    // Awqaf — dome / mosque mark
    return (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M16 4 C 10 8 8 12 8 16 H 24 C 24 12 22 8 16 4 Z" stroke={stroke} strokeWidth="1.4" />
        <rect x="6" y="16" width="20" height="12" stroke={stroke} strokeWidth="1.4" />
        <line x1="16" y1="16" x2="16" y2="28" stroke={stroke} strokeWidth="1.2" />
        <circle cx="16" cy="3" r="0.8" fill={stroke} />
      </svg>
    );
  }
  if (index === 1) {
    // Tilawah — open Quran
    return (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M4 8 C 9 7 13 8 16 11 C 19 8 23 7 28 8 V 25 C 23 24 19 25 16 27 C 13 25 9 24 4 25 Z" stroke={stroke} strokeWidth="1.4" />
        <line x1="16" y1="11" x2="16" y2="27" stroke={stroke} strokeWidth="1.2" />
      </svg>
    );
  }
  // Goodstack — stacked blocks
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="6" y="20" width="20" height="6" rx="1.5" stroke={stroke} strokeWidth="1.4" />
      <rect x="8" y="13" width="16" height="6" rx="1.5" stroke={stroke} strokeWidth="1.4" />
      <rect x="10" y="6" width="12" height="6" rx="1.5" stroke={stroke} strokeWidth="1.4" />
    </svg>
  );
}
