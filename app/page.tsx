import { site, about, education } from "@/content/site";
import { projects, type Project } from "@/content/projects";
import { skills } from "@/content/skills";
import ProjectVisual from "@/components/ProjectVisual";
import { ArrowUpRight, CopyIcon, GitHubIcon, LinkedInIcon, MenuIcon } from "@/components/Icons";

const nav = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span key={i} className="ltr" aria-hidden style={{ ["--i" as string]: i + offset }}>{ch}</span>
      ))}
    </>
  );
}

function Ticker() {
  const items = skills.flatMap((g) => g.items);
  const row = items.map((t, i) => (
    <span key={i} className="tk">
      <span className="tk-name">{t}</span>
      <span className="tk-up">▲</span>
    </span>
  ));
  return (
    <div className="ticker" aria-hidden>
      <div className="ticker-track">
        <div className="ticker-row">{row}</div>
        <div className="ticker-row">{row}</div>
      </div>
    </div>
  );
}

function ProjectLinks({ p }: { p: Project }) {
  if (!p.repo && !p.live) return null;
  return (
    <div className="p-links">
      {p.live && <a className="btn btn-solid" href={p.live} target="_blank" rel="noreferrer">Visit {p.name} <ArrowUpRight size={16} /></a>}
      {p.repo && <a className="btn" href={p.repo} target="_blank" rel="noreferrer"><GitHubIcon size={16} /> Source code</a>}
    </div>
  );
}

function Screenshot({ p }: { p: Project }) {
  const host = p.live ? new URL(p.live).host : "";
  const frame = (
    <figure className="shot">
      <div className="shot-bar" aria-hidden>
        <i /><i /><i />
        {host && <span className="shot-url">{host}</span>}
      </div>
      <img src={p.image} alt={`${p.name} home page`} width={1440} height={900} decoding="async" />
    </figure>
  );
  return p.live
    ? <a className="shot-link" href={p.live} target="_blank" rel="noreferrer" aria-label={`Open ${p.name} (live site)`}>{frame}</a>
    : frame;
}

function Panel({ p, wide }: { p: Project; wide?: boolean }) {
  return (
    <article className={`panel t-${p.theme} ${wide ? "panel-wide" : "panel-split"}`} id={p.slug} data-watch data-node>
      <header className="panel-head">
        <h3 className="panel-name" data-anchor><span className="mask"><span className="mask-in">{p.name}</span></span></h3>
        <div className="panel-meta">
          <p className="panel-kind">{p.kind}</p>
          <p className="panel-date">
            {p.date}
            {p.status && <span className="panel-status">{p.status}</span>}
          </p>
        </div>
      </header>

      <div className={`panel-visual${p.image ? " panel-shot" : ""}`}>
        {p.image ? <Screenshot p={p} /> : <ProjectVisual type={p.visual} />}
      </div>

      <div className="panel-body">
        <p className="panel-summary">{p.summary}</p>
        <ul className="panel-points">
          {p.highlights.map((h) => <li key={h}>{h}</li>)}
          {p.engineering && <li className="panel-eng"><b>Hardest part:</b> {p.engineering}</li>}
        </ul>
        <div className="panel-foot">
          <p className="panel-stack">{p.stack.join(", ")}</p>
          <ProjectLinks p={p} />
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className="nav" data-nav>
        <a href="#top" className="nav-name">{site.name}</a>
        <nav aria-label="Primary">
          <ul className="nav-links" data-menu>
            {nav.map((n) => <li key={n.id}><a href={`#${n.id}`} data-navlink={n.id}>{n.label}</a></li>)}
            <li className="nav-resume-li"><a className="nav-resume" href={site.resume} target="_blank" rel="noreferrer">Resume</a></li>
          </ul>
        </nav>
        <button className="menu-btn" type="button" data-menu-toggle aria-expanded="false" aria-label="Open menu">
          <MenuIcon size={22} />
        </button>
      </header>

      <main id="main">
        {/* Hero: the name is the design */}
        <section className="hero" id="top">
          <h1 className="hero-name" aria-label={site.name} data-name>
            <span className="hero-line"><Letters text={site.firstName} /></span>
            <span className="hero-line hero-line-2"><Letters text={site.lastName} offset={site.firstName.length} /></span>
          </h1>

          <div className="hero-foot">
            <p className="hero-intro">{site.intro}</p>
            <div className="hero-actions">
              <a className="btn btn-solid btn-big" href="#work" data-magnet>See my projects</a>
              <a className="btn btn-big" data-magnet href={site.resume} target="_blank" rel="noreferrer">Resume (PDF)</a>
            </div>
            <ul className="hero-facts">
              <li><span>Studying</span>{education.degree}, {education.school}</li>
              <li><span>Graduating</span>{education.graduation}</li>
              <li><span>Based in</span>{site.location}</li>
            </ul>
          </div>

        </section>

        {/* About */}
        <section className="about" id="about">
          <h2 className="sr-only">About</h2>
          <p className="about-statement" data-reveal>{about.statement}</p>
          {about.body.map((b, i) => <p key={b} className="about-body" data-reveal style={{ ["--rd" as string]: `${(i + 1) * 100}ms` }}>{b}</p>)}
          {about.interests.length > 0 && (
            <div className="about-outside" data-reveal style={{ ["--rd" as string]: "200ms" }}>
              <h3>When I&apos;m not coding</h3>
              <ul>{about.interests.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          )}
        </section>

        <Ticker />

        <div className="track" data-track>
        <div className="rail" aria-hidden data-rail />
        <p className="track-cue" aria-hidden><i />Scroll to follow the signal</p>

        {/* Work */}
        <section className="work" id="work">
          <div className="work-intro">
            <h2 data-reveal>Things I&apos;ve built</h2>
            <p data-reveal style={{ ["--rd" as string]: "120ms" }}>Three apps I built from scratch, plus a few smaller sites from when I was starting out.</p>
          </div>

          {featured.map((p, i) => <Panel key={p.slug} p={p} wide={i === 0} />)}

          {more.length > 0 && (
            <div className="more" data-node>
              <div className="more-head" data-reveal>
                <h3 data-anchor>Earlier work</h3>
                <p>Smaller sites I built before Stevens, mostly in HTML, CSS, JavaScript and Vue.</p>
              </div>
              <ul>
                {more.map((p) => (
                  <li key={p.slug} className="more-row">
                    <h4>{p.name}</h4>
                    <p className="more-sum">{p.summary}</p>
                    <p className="more-stack">{p.stack.join(", ")}</p>
                    <div className="more-links">
                      {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live site<span className="sr-only"> for {p.name}</span></a>}
                      {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Code<span className="sr-only"> for {p.name}</span></a>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="work-github">
            Everything else lives on{" "}
            <a href={site.links.github} target="_blank" rel="noreferrer">my GitHub</a>.
          </p>
        </section>

        {/* Skills */}
        <section className="tools" id="skills" data-node>
          <h2 data-reveal data-anchor>Skills</h2>
          <dl className="skills" data-reveal style={{ ["--rd" as string]: "120ms" }}>
            {skills.map((g) => (
              <div key={g.group}>
                <dt>{g.group}</dt>
                <dd>{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Contact */}
        <section className="contact" id="contact" data-node>
          <h2 data-reveal data-anchor>Want to talk? Email me.</h2>
          <a className="contact-email" href={`mailto:${site.email}`}>{site.email.split("@")[0]}<wbr />@{site.email.split("@")[1]}</a>
          <div className="contact-actions" data-reveal style={{ ["--rd" as string]: "160ms" }}>
            <button className="btn btn-invert" type="button" data-copy={site.email}>
              <CopyIcon size={16} /> <span data-copy-label>Copy email</span>
            </button>
            <a className="btn btn-invert" href={site.links.github} target="_blank" rel="noreferrer"><GitHubIcon size={16} /> GitHub</a>
            {site.links.linkedin && (
              <a className="btn btn-invert" href={site.links.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon size={16} /> LinkedIn</a>
            )}
            <a className="btn btn-invert" href={site.resume} target="_blank" rel="noreferrer">Resume (PDF)</a>
          </div>
          <footer className="footer">
            <span>{site.name}, {new Date().getFullYear()}</span>
          </footer>
        </section>
        </div>
      </main>
    </>
  );
}
