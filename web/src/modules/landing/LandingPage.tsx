import { useState } from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import logo from "../../assets/brand/logisticbay-logo.png";
import runs1200 from "../../assets/landing/runs-1200.webp";
import runs2000 from "../../assets/landing/runs-2000.webp";
import planning1200 from "../../assets/landing/planning-1200.webp";
import planning2000 from "../../assets/landing/planning-2000.webp";
import job1200 from "../../assets/landing/jobs-1-1200.webp";
import job2000 from "../../assets/landing/jobs-1-2000.webp";
import fleet1200 from "../../assets/landing/fleet-1200.webp";
import fleet2000 from "../../assets/landing/fleet-2000.webp";
import request390 from "../../assets/landing/request-phone-390.webp";
import request780 from "../../assets/landing/request-phone-780.webp";

// The public face of LogisticBay TMS, in the shared LogisticBay brand
// ("The Lane" — Q25ltd/LB-Website BRAND.md). Every capability on this page is
// ✅ in STATUS.md; nothing planned, partial or stubbed is advertised. Every
// picture is a real screen of this application, captured locally with
// fictional demonstration data ("Example Haulage") — never production data.

// Until the domain move, logisticbay.com still serves this app; these links
// become the brand site once it moves (no change needed here).
const BRAND_SITE = "https://logisticbay.com";
const TIMESHEETS_SITE = "https://timesheets.logisticbay.com";
const SUPPORT_EMAIL = "support@logisticbay.com";
const DEMO_NOTE = "Real interface, fictional demonstration data.";

type IconName = "arrow" | "check" | "request" | "clipboard" | "route" | "truck" | "users" | "phone" | "board";

const ICON_PATHS: Record<IconName, string> = {
  arrow: "M5 12h14m-5-5 5 5-5 5",
  check: "m5 12.5 4.5 4.5L19 7.5",
  request: "M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66L11.5 6.8M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1.5-1.46",
  clipboard: "M9 4h6v3H9zM7 5.5H5.5v15h13v-15H17M8.5 11h7M8.5 14.5h7M8.5 18h4",
  route: "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 17h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7",
  truck: "M3 6h11v9H3zM14 9h4l3 3v3h-7M7 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18.5 20a6.5 6.5 0 0 0-2.5-5.1",
  phone: "M7.5 3h9a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM11 18h2",
  board: "M4 5h16v14H4zM4 9h16M9 9v10M15 9v10",
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg className="lb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

interface ScreenProps {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
  address?: string;
  phone?: boolean;
  eager?: boolean;
}

/** A real screen of the application, framed as a browser window or a phone. */
function Screen({ src, srcSet, sizes, width, height, alt, address, phone = false, eager = false }: ScreenProps) {
  return (
    <figure className={phone ? "lb-screen lb-screen--phone" : "lb-screen"}>
      <div className="lb-screen__frame">
        {!phone && (
          <div className="lb-screen__bar" aria-hidden="true">
            <span className="lb-screen__dots"><i /><i /><i /></span>
            {address !== undefined && <span className="lb-screen__address">{address}</span>}
          </div>
        )}
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          width={width}
          height={height}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    </figure>
  );
}

const BROWSER_SIZES = "(max-width: 960px) 92vw, 760px";

const SCREENS = {
  runs: {
    src: runs1200, srcSet: `${runs1200} 1200w, ${runs2000} 2000w`, width: 1200, height: 750,
    address: "tms.logisticbay.com/app/runs",
    alt: "The Runs screen: each run with its collection and delivery, a readiness score and checks, and the driver, truck and trailer assigned, beside the company's drivers, units and trailers.",
  },
  planning: {
    src: planning1200, srcSet: `${planning1200} 1200w, ${planning2000} 2000w`, width: 1200, height: 750,
    address: "tms.logisticbay.com/app/planning",
    alt: "The Planning screen: freight that needs planning on the left, and runs with their stops and planning checks on the right.",
  },
  job: {
    src: job1200, srcSet: `${job1200} 1200w, ${job2000} 2000w`, width: 1200, height: 750,
    address: "tms.logisticbay.com/app/jobs",
    alt: "A job's detail: customer and reference, load, vehicle requirements and each stop with its booked time and instructions.",
  },
  fleet: {
    src: fleet1200, srcSet: `${fleet1200} 1200w, ${fleet2000} 2000w`, width: 1200, height: 479,
    address: "tms.logisticbay.com/app/fleet",
    alt: "The Fleet screen: the company's units with their class and status.",
  },
  request: {
    src: request390, srcSet: `${request390} 390w, ${request780} 780w`, width: 390, height: 844,
    alt: "A customer's transport request form on a phone: their details, stops, load, special and transport requirements, and billing.",
  },
} as const;

interface Step {
  id: string;
  title: string;
  summary: string;
  points: string[];
  screen: keyof typeof SCREENS;
}

const STEPS: Step[] = [
  {
    id: "request",
    title: "Request",
    summary: "Customers request transport through your link.",
    points: [
      "Share one link with your customers",
      "They give stops, load and requirements on any device",
      "Each request arrives for you to accept or reject",
    ],
    screen: "request",
  },
  {
    id: "job",
    title: "Job",
    summary: "Every job carries the detail the work needs.",
    points: [
      "Stops with booked times, references and instructions",
      "Dangerous goods and temperature control",
      "Checks before a job is ready to plan",
    ],
    screen: "job",
  },
  {
    id: "plan",
    title: "Plan",
    summary: "Turn waiting freight into runs.",
    points: [
      "See the freight that needs planning",
      "Build runs stop by stop",
      "Planning checks flag what does not fit",
    ],
    screen: "planning",
  },
  {
    id: "dispatch",
    title: "Dispatch",
    summary: "Allocate and publish to the driver.",
    points: [
      "Driver, truck and trailer on one screen",
      "Readiness checks before you publish",
      "The published run goes to the driver app",
    ],
    screen: "runs",
  },
];

const CAPABILITIES: { icon: IconName; title: string; body: string }[] = [
  { icon: "clipboard", title: "Detailed job intake", body: "Create jobs with stops, load details and vehicle requirements — including dangerous goods and temperature control — with checks before a job is ready to plan." },
  { icon: "request", title: "Customer request links", body: "Give customers a link to request transport. Requests arrive for review, and you accept or reject each one." },
  { icon: "board", title: "Planning board", body: "See the freight waiting to be planned beside your runs, and build each run stop by stop." },
  { icon: "route", title: "Runs and allocation", body: "Group jobs into runs, assign a driver, truck and trailer on one screen, and publish the run to the driver." },
  { icon: "truck", title: "Fleet", body: "Keep your trucks and trailers on record, with their type and status, ready to put on a run." },
  { icon: "users", title: "Drivers and holidays", body: "Keep your drivers in one place, handle holiday requests and approvals, and see when a run's hours look too long." },
];

const DRIVER_APP = [
  "Today's and upcoming jobs, with every stop in order",
  "Address, booked time, site contact and directions for each stop",
  "Hazard and load safety information shown up front",
  "Start-of-shift vehicle setup and checklist",
  "Collection and delivery recorded at each stop",
  "Works offline — syncs when the signal returns",
];

function Lockup() {
  return (
    <>
      <img src={logo} width={640} height={162} alt="" />
      <span className="lb-lockup__rule" aria-hidden="true" />
      <span className="lb-lockup__product">TMS</span>
    </>
  );
}

export default function LandingPage() {
  const [active, setActive] = useState(STEPS[0].id);
  const step = STEPS.find(s => s.id === active) ?? STEPS[0];
  const screen = SCREENS[step.screen];
  const isPhone = step.screen === "request";

  function onStepKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (delta === 0) return;
    event.preventDefault();
    const next = STEPS[(index + delta + STEPS.length) % STEPS.length];
    setActive(next.id);
    document.getElementById(`lb-step-${next.id}`)?.focus();
  }

  return (
    <div className="lb-landing">
      <a className="lb-skip" href="#lb-main">Skip to main content</a>

      <header className="lb-header">
        <div className="lb-container lb-header__bar">
          <Link to="/" className="lb-lockup" aria-label="LogisticBay TMS home"><Lockup /></Link>
          <nav aria-label="Main">
            <ul className="lb-nav">
              <li><a href="#workflow">How it works</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#driver">Driver app</a></li>
              <li><a href="#status">Status</a></li>
              <li><a href={BRAND_SITE}>LogisticBay</a></li>
            </ul>
          </nav>
          <div className="lb-header__actions">
            <Link className="lb-header__signin" to="/login">Sign in</Link>
            <Link className="lb-button lb-button--primary" to="/register">Register</Link>
          </div>
        </div>
      </header>

      <main id="lb-main">
        <section className="lb-hero" aria-labelledby="lb-hero-title">
          <div className="lb-container">
            <div className="lb-hero__text">
              <span className="lb-status">Early development</span>
              <h1 id="lb-hero-title">Plan and dispatch <span>your transport work.</span></h1>
              <p className="lb-hero__lede">
                Take transport jobs in, plan them into runs, put a driver, truck and trailer on each run, and send the work
                to your drivers' phones.
              </p>
              <div className="lb-hero__actions">
                <Link className="lb-button lb-button--primary lb-button--large" to="/register">Register your company</Link>
                <Link className="lb-button lb-button--secondary lb-button--large" to="/login">Sign in</Link>
              </div>
              <p className="lb-hero__note">
                A <a href={BRAND_SITE}>LogisticBay</a> product · Transport Management System
              </p>
            </div>
            <div className="lb-hero__stage">
              <Screen {...SCREENS.runs} sizes="(max-width: 1120px) 94vw, 1080px" eager />
              <ol className="lb-callouts" aria-hidden="true">
                <li className="lb-callout" style={{ left: "52%", top: "30%" }}><b>1</b>Readiness checks before you publish</li>
                <li className="lb-callout" style={{ left: "26%", top: "51%" }}><b>2</b>Driver, truck and trailer on one screen</li>
                <li className="lb-callout" style={{ left: "58%", top: "82%" }}><b>3</b>Your drivers, units and trailers</li>
              </ol>
              <p className="lb-screen__caption">The Runs board — {DEMO_NOTE}</p>
            </div>
          </div>
        </section>

        <section id="workflow" className="lb-workflow" aria-labelledby="lb-workflow-title">
          <div className="lb-container">
            <div className="lb-section-head">
              <p className="lb-eyebrow">How it works</p>
              <h2 id="lb-workflow-title">From request to run.</h2>
              <p>Four stops on one lane — each one a real screen of the planner. Choose a stop to see it.</p>
            </div>

            <div role="tablist" aria-label="The TMS workflow" className="lb-steps">
              {STEPS.map((s, index) => (
                <button
                  key={s.id}
                  id={`lb-step-${s.id}`}
                  type="button"
                  role="tab"
                  className="lb-step"
                  aria-selected={s.id === active}
                  aria-controls="lb-step-panel"
                  tabIndex={s.id === active ? 0 : -1}
                  onClick={() => setActive(s.id)}
                  onKeyDown={event => onStepKey(event, index)}
                >
                  <span className="lb-step__marker">{index + 1}</span>
                  <span className="lb-step__title">{s.title}</span>
                  <span className="lb-step__body">{s.summary}</span>
                </button>
              ))}
            </div>

            <div id="lb-step-panel" role="tabpanel" aria-labelledby={`lb-step-${step.id}`} className="lb-workflow__panel">
              <div className="lb-workflow__copy">
                <h3>{step.summary}</h3>
                <ul>
                  {step.points.map(point => <li key={point}><Icon name="check" />{point}</li>)}
                </ul>
              </div>
              <div key={step.id} className={isPhone ? "lb-workflow__screen lb-workflow__screen--phone" : "lb-workflow__screen"}>
                <Screen {...screen} sizes={isPhone ? "300px" : BROWSER_SIZES} phone={isPhone} />
                <p className="lb-screen__caption">{DEMO_NOTE}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="lb-capabilities" aria-labelledby="lb-features-title">
          <div className="lb-container">
            <div className="lb-section-head">
              <p className="lb-eyebrow">For the planning office</p>
              <h2 id="lb-features-title">What works today.</h2>
              <p>Only what is built and working in the TMS now.</p>
            </div>
            <ul className="lb-capability-grid">
              {CAPABILITIES.map(c => (
                <li key={c.title} className="lb-capability" data-reveal>
                  <span className="lb-capability__icon"><Icon name={c.icon} /></span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </li>
              ))}
            </ul>

            <div className="lb-fleet" data-reveal>
              <div className="lb-fleet__copy">
                <p className="lb-eyebrow">Fleet</p>
                <h2>Your units and trailers, ready to plan.</h2>
                <p>Record each truck and trailer once, with its class, body type and status — then put it on a run from the Runs board.</p>
              </div>
              <div>
                <Screen {...SCREENS.fleet} sizes={BROWSER_SIZES} />
                <p className="lb-screen__caption">{DEMO_NOTE}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="driver" className="lb-driver" aria-labelledby="lb-driver-title">
          <div className="lb-container">
            <div className="lb-section-head">
              <p className="lb-eyebrow">For the driver</p>
              <h2 id="lb-driver-title">The run, stop by stop, on the driver's phone.</h2>
              <p>When a run is published, the driver works through it in the LogisticBay TMS driver app.</p>
            </div>
            <ul className="lb-driver__list">
              {DRIVER_APP.map(item => <li key={item}><Icon name="check" />{item}</li>)}
            </ul>
            <p className="lb-driver__note">
              The driver app is being prepared for its first pilot. It is not yet available in the app stores.
            </p>
          </div>
        </section>

        <section id="status" className="lb-status-section" aria-labelledby="lb-status-title">
          <div className="lb-container">
            <div className="lb-status-panel" data-reveal>
              <div className="lb-status-panel__copy">
                <span className="lb-status">Early development</span>
                <h2 id="lb-status-title">An honest picture of where it stands.</h2>
                <p>
                  LogisticBay TMS is in early development. The planning workflow on this page works today; much of the
                  long-term product is still to be built, and new capabilities appear here only once they work.
                </p>
                <p>
                  It is currently designed around UK operations — addresses, postcodes and vehicle classes.
                </p>
                <p>
                  Questions before you register? <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                </p>
              </div>
              <div>
                <p className="lb-eyebrow lb-start__title">Getting started</p>
                <ol className="lb-start">
                  <li><h3>Register your company</h3><p>Create your company account in the planner.</p></li>
                  <li><h3>Add drivers, trucks and trailers</h3><p>Set up your team and your fleet.</p></li>
                  <li><h3>Plan your first run</h3><p>Take a job in, put it on a run with a driver, truck and trailer, and publish it.</p></li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="lb-cta" aria-labelledby="lb-cta-title">
          <div className="lb-container lb-cta__inner">
            <div>
              <h2 id="lb-cta-title">Ready to plan your first run?</h2>
              <p>Register your company, or sign in if you already have an account.</p>
            </div>
            <div className="lb-cta__actions">
              <Link className="lb-button lb-button--on-dark lb-button--large" to="/register">Register your company</Link>
              <Link className="lb-button lb-button--ghost-on-dark lb-button--large" to="/login">Sign in</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="lb-footer">
        <div className="lb-container lb-footer__grid">
          <div className="lb-footer__brand">
            <Link to="/" className="lb-lockup" aria-label="LogisticBay TMS home"><Lockup /></Link>
            <p>Transport management for planners, dispatchers and their drivers.</p>
          </div>
          <nav aria-label="LogisticBay TMS">
            <h2>TMS</h2>
            <ul>
              <li><Link to="/login">Sign in</Link></li>
              <li><Link to="/register">Register your company</Link></li>
              <li><a href="#workflow">How it works</a></li>
            </ul>
          </nav>
          <nav aria-label="LogisticBay">
            <h2>LogisticBay</h2>
            <ul>
              <li><a href={BRAND_SITE}>LogisticBay home</a></li>
              <li><a href={TIMESHEETS_SITE}>LogisticBay Timesheets</a></li>
            </ul>
          </nav>
          <nav aria-label="Contact">
            <h2>Contact</h2>
            <ul>
              <li><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></li>
            </ul>
          </nav>
        </div>
        <div className="lb-container lb-footer__base">
          <p>© 2026 Q25 Ltd. LogisticBay is a brand of Q25 Ltd.</p>
          <span className="lb-footer__lane" aria-hidden="true" />
        </div>
      </footer>
    </div>
  );
}
