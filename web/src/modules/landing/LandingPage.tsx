import { useNavigate } from "react-router-dom";

// Every capability on this page is ✅ in STATUS.md. Nothing planned, partial
// or stubbed is advertised here — when a feature is finished, it is added.

const FEATURES = [
  {
    icon: "📋",
    name: "Detailed job intake",
    desc: "Create jobs with stops, load details and vehicle requirements — including dangerous goods and temperature control — with checks before a job is ready to plan.",
    bg: "bg-blue-50",
  },
  {
    icon: "🔗",
    name: "Customer request links",
    desc: "Give customers a link to request transport. Requests arrive for review, and you accept or reject each one.",
    bg: "bg-indigo-50",
  },
  {
    icon: "🗓️",
    name: "Runs and allocation",
    desc: "Group jobs into runs, assign a driver, truck and trailer on one screen, and publish the run to the driver.",
    bg: "bg-green-50",
  },
  {
    icon: "🚛",
    name: "Fleet",
    desc: "Keep your trucks and trailers on record, with their type and status, ready to put on a run.",
    bg: "bg-orange-50",
  },
  {
    icon: "👥",
    name: "Drivers and holidays",
    desc: "Keep your drivers in one place, handle holiday requests and approvals, and check working time.",
    bg: "bg-slate-100",
  },
];

const DRIVER_APP = [
  "Today's and upcoming jobs, with every stop in order",
  "Address, booked time, site contact and directions for each stop",
  "Hazard and load safety information shown up front",
  "Start-of-shift vehicle setup and checklist",
  "Collection and delivery recorded at each stop",
  "Works offline — syncs when the signal returns",
];

const STEPS = [
  { n: "1", title: "Register your company", body: "Create your company account and confirm your email address." },
  { n: "2", title: "Add drivers, trucks and trailers", body: "Set up your team and your fleet in the planner." },
  { n: "3", title: "Plan your first run", body: "Take a job in, put it on a run with a driver, truck and trailer, and publish it." },
];

export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-black tracking-tight">
            Logistic<span className="text-blue-500">Bay</span>
            <span className="ml-2 text-sm font-bold text-slate-500">TMS</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => nav("/login")}
            >
              Sign in
            </button>
            <button
              className="inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
              onClick={() => nav("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* background decoration */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6366f1 0%, transparent 40%)"
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="inline-flex items-center bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            LogisticBay TMS
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
            Plan and dispatch<br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              your transport work
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-xl mb-8 leading-relaxed">
            Take transport jobs in, plan them into runs, put a driver, truck and trailer on each run, and send the work to your drivers' phones.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-400 text-white font-bold text-base px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/30"
              onClick={() => nav("/register")}
            >
              Register your company
            </button>
            <button
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base px-7 py-3.5 rounded-xl transition-colors"
              onClick={() => nav("/login")}
            >
              Sign in
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
              For the planning office
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              From the job coming in to the run going out to the driver.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div
                key={f.name}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${f.bg} text-2xl mb-4`} aria-hidden="true">
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{f.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DRIVER APP ── */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
            For the driver
          </h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-2xl">
            When a run is published, the driver sees it in the LogisticBay driver app and works through it stop by stop.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-slate-300 text-sm">
            {DRIVER_APP.map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5 shrink-0" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Getting started</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative text-center sm:text-left">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-black text-lg mb-4">
                  {s.n}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-5 left-10 right-0 h-px bg-gradient-to-r from-blue-300 to-transparent" />
                )}
                <h3 className="font-bold text-slate-900 text-base mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-8">
            Ready to plan your first run?
          </h2>
          <button
            className="inline-flex items-center justify-center w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-black text-lg px-10 py-4 rounded-2xl transition-colors shadow-xl shadow-blue-500/30"
            onClick={() => nav("/register")}
          >
            Register your company
          </button>
          <p className="text-slate-400 text-sm mt-4">
            Already have an account?{" "}
            <button className="text-blue-500 hover:underline font-semibold" onClick={() => nav("/login")}>
              Sign in
            </button>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <div className="font-black text-slate-700 text-base">
            Logistic<span className="text-blue-500">Bay</span>
          </div>
          <span>© 2026 Q25 Ltd. LogisticBay is a brand of Q25 Ltd.</span>
        </div>
      </footer>

    </div>
  );
}
