import { useEffect, useState } from 'react'
import { AppWindow } from '../components/AppWindow'
import { ThemeToggle } from '../components/ThemeToggle'

const RELEASES_URL = 'https://www.youtube.com/@madebyprincesa/releases'
const SPOTIFY_URL =
  'https://open.spotify.com/artist/0F8Bdp749rixPR1XvoqdSr?si=IdiwetGYTCqGrHWWDpXIcQ'
const APPLE_MUSIC_URL = 'https://music.apple.com/us/artist/princesa/1546036257'
const CZARDAS_PERFORMANCE_URL = 'https://youtu.be/oBRS4_sPhkQ?si=lIAjwF-ouv1TqbDp'
const LINKEDIN_URL = 'https://www.linkedin.com/in/anastasia-princesa-rastelli/'

const CURRENT_FOCUS = [
  'AI creativity',
  'ML',
  'XR',
  'robotics experimentation',
  'multimodal systems'
] as const

const TECH_TOOLKIT = [
  'Python',
  'JavaScript',
  'TypeScript',
  'HTML/CSS',
  'React',
  'Streamlit',
  'Jupyter Notebook',
  'Three.js / WebXR',
  'RF experimentation / SDR',
  'Git / GitHub',
] as const

const CREATIVE_TOOLKIT = ['Premiere Pro', 'Logic Pro', 'Lightroom', 'Procreate'] as const

const MUSICAL_BACKGROUND = [
  'Piano',
  'Violin',
  'Ukulele',
  'Singing',
  'Composition',
  'Songwriting',
  'Vocal production',
  'Music production',
] as const

/** Stages for AI-Generated WebXR World (shown under one disclosure in Projects). */
const WEBXR_WORLD_STAGES: readonly { label: string; href: string }[] = [
  { label: 'Stage 1', href: 'https://youtu.be/jnE83yeJJtU?si=6vQZNp8OFppFKDNG' },
  { label: 'Stage 2', href: 'https://youtu.be/BE7D97fOQfA?si=TAoW5p-InQk3bOiN' },
  { label: 'Stage 3', href: 'https://youtu.be/V9uygz95t2w?si=3yOjS0toLgeIvRDh' },
]

const WEBXR_PROJECT_DESCRIPTION =
  'An experimental WebXR project designed to test the limits of AI prompting in 3D scene generation. Using text-based prompts, this project explored how effectively generative AI could create interactive browser-based environments and scene viewers.'

const FRED_ROBOSCOUT_DEMO_URL =
  'https://youtube.com/shorts/QevpI6Pi2Gc?si=WrcrmTsR2o9X6yfI'

const FRED_ROBOSCOUT_PARAGRAPHS = [
  "This is the Sharper Image RoboScout from 2000, a radio-controlled robot originally designed as an interactive toy. When I first started this project, my goal was to integrate an AI component and experiment with robotic interaction. However, I also wanted to preserve the robot in its original condition without physically modifying the inside or outside of the hardware.",
  'That led me to a different question: could I control the robot externally by understanding and reproducing the wireless communication between the remote and RoboScout itself?',
  "To explore this, I began studying the robot's patent documentation, FCC filings, and RF communication behavior. Using HackRF and Universal Radio Hacker (URH), I identified that RoboScout operates at 926.25 MHz. From there, I captured and analyzed wireless control signals, then replayed those RF transmissions through Python-based workflows to wirelessly trigger movement and interaction.",
  'Through this project, I explored concepts involving software-defined radio (SDR), RF communication, signal replay, embedded systems, and experimental robotics. What began as a curiosity project became an introduction to RF engineering and wireless systems experimentation.',
  'My next goal is to develop a system capable of allowing an AI model to intelligently select and transmit these RF movement recordings in real time with as little latency as possible.',
] as const

const hasProjectsContent =
  WEBXR_WORLD_STAGES.length > 0 || FRED_ROBOSCOUT_PARAGRAPHS.length > 0

const disclosureButtonClass =
  'inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded-md border border-[var(--accent)]/25 bg-[var(--surface)] px-2.5 py-1.5 text-left text-xs font-medium text-[var(--text)] shadow-sm outline-none transition hover:border-[var(--accent)]/45 hover:bg-[var(--elevated)] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--elevated)]'

const projectsDisclosureButtonClass = `${disclosureButtonClass} w-full justify-between`

function HeadphonesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  )
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function FolderProjectsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v1.6" />
      <path d="M2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function ExpandChevron({ expanded, className }: { expanded: boolean; className?: string }) {
  return (
    <svg
      className={`shrink-0 text-[var(--accent)] transition-transform duration-200 ${expanded ? 'rotate-180' : ''} ${className ?? ''}`}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function HomePage() {
  const [musicOpen, setMusicOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [webxrStagesOpen, setWebxrStagesOpen] = useState(false)
  const [fredRoboscoutOpen, setFredRoboscoutOpen] = useState(false)
  const [techToolkitOpen, setTechToolkitOpen] = useState(false)
  const [creativeToolkitOpen, setCreativeToolkitOpen] = useState(false)
  const [musicalBackgroundOpen, setMusicalBackgroundOpen] = useState(false)

  useEffect(() => {
    if (!aboutOpen) {
      setTechToolkitOpen(false)
      setCreativeToolkitOpen(false)
      setMusicalBackgroundOpen(false)
    }
  }, [aboutOpen])

  useEffect(() => {
    if (!projectsOpen) {
      setWebxrStagesOpen(false)
      setFredRoboscoutOpen(false)
    }
  }, [projectsOpen])

  return (
    <div className="relative min-h-dvh selection:bg-[var(--accent)]/25 selection:text-[var(--text)]">
      <div className="fixed right-4 top-4 z-50 md:right-6 md:top-6">
        <ThemeToggle />
      </div>

      <main
        id="main"
        className="grid min-h-dvh w-full place-items-center px-5 py-20 sm:px-6"
      >
        <div className="w-full min-w-0 max-w-5xl overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--elevated)] shadow-[0_14px_36px_-10px_rgba(157,23,77,0.18)] dark:border-[#5c1f40] dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)]">
          <div className="flex items-center bg-[#9d174d] px-3 py-2 dark:bg-[#701a35]">
            <span className="font-sans text-[10px] font-medium tracking-[0.22em] text-[#fff5f7]">
              PORTFOLIO
            </span>
          </div>
          <div className="flex min-w-0 flex-col items-center gap-8 bg-[var(--elevated)] px-4 pb-7 pt-6 sm:px-8 sm:pb-8 sm:pt-7 md:px-10">
            <div className="flex min-h-[2lh] w-full min-w-0 max-w-full items-center justify-center">
              <h1 className="text-center font-sans text-[clamp(0.7rem,0.6rem+1.2vw,1.7rem)] font-semibold leading-snug tracking-tight text-[var(--text)] text-pretty whitespace-normal sm:whitespace-nowrap">
                Hello! I&apos;m <span className="text-[var(--accent)]">Anastasia Rastelli</span>
              </h1>
            </div>

            <ul className="m-0 flex list-none flex-row flex-wrap items-end justify-center gap-6 p-0 sm:gap-10">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMusicOpen(false)
                    setProjectsOpen(false)
                    setAboutOpen(true)
                  }}
                  className="flex flex-col items-center gap-3 rounded-2xl p-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--elevated)]"
                >
                  <span className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-[var(--border)] bg-[var(--elevated)] text-[var(--accent)] shadow-md dark:shadow-black/30">
                    <PersonIcon className="h-[3.25rem] w-[3.25rem] opacity-95" />
                  </span>
                  <span className="text-sm font-medium text-[var(--muted)]">About</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setAboutOpen(false)
                    setMusicOpen(false)
                    setProjectsOpen(true)
                  }}
                  className="flex flex-col items-center gap-3 rounded-2xl p-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--elevated)]"
                >
                  <span className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-[var(--border)] bg-[var(--elevated)] text-[var(--accent)] shadow-md dark:shadow-black/30">
                    <FolderProjectsIcon className="h-[3.25rem] w-[3.25rem] opacity-95" />
                  </span>
                  <span className="text-sm font-medium text-[var(--muted)]">Projects</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setAboutOpen(false)
                    setProjectsOpen(false)
                    setMusicOpen(true)
                  }}
                  className="flex flex-col items-center gap-3 rounded-2xl p-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--elevated)]"
                >
                  <span className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-[var(--border)] bg-[var(--elevated)] text-[var(--accent)] shadow-md dark:shadow-black/30">
                    <HeadphonesIcon className="h-[3.25rem] w-[3.25rem] opacity-95" />
                  </span>
                  <span className="text-sm font-medium text-[var(--muted)]">Music</span>
                </button>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Anastasia Rastelli on LinkedIn (opens in new tab)"
                  className="flex flex-col items-center gap-3 rounded-2xl p-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--elevated)]"
                >
                  <span className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-[var(--border)] bg-[var(--elevated)] text-[var(--accent)] shadow-md dark:shadow-black/30">
                    <LinkedInIcon className="h-[3.25rem] w-[3.25rem] opacity-95" />
                  </span>
                  <span className="text-sm font-medium text-[var(--muted)]">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {aboutOpen ? (
        <AppWindow title="About" maxWidthClass="max-w-md" onClose={() => setAboutOpen(false)}>
          <div className="flex flex-col gap-3 text-[var(--text)]">
            <div className="flex gap-4 border-b border-[var(--border)] pb-3">
              <img
                src={`${import.meta.env.BASE_URL}anastasia-profile.png`}
                alt="Portrait of Anastasia Rastelli"
                width={112}
                height={112}
                className="h-28 w-28 shrink-0 rounded-full border-2 border-[var(--border)] object-cover shadow-sm"
              />
              <div className="flex min-w-0 flex-col justify-center gap-1">
                <p className="m-0 font-sans text-lg font-semibold leading-snug tracking-tight text-[var(--text)]">
                  Anastasia <span className="text-[var(--accent)]">Rastelli</span>
                </p>
                <p className="m-0 text-xs leading-snug text-[var(--muted)]">
                  Honors student, University of Arizona · Creative Technologist · Musician
                </p>
              </div>
            </div>
            <p className="m-0 leading-relaxed">
              Hello! I am Anastasia. I am a third year Honors student at the University of Arizona.
            </p>
            <p className="m-0 leading-relaxed">
              I am currently pursuing a dual degree in Applied Computing with an Emphasis in AI, and
              Creative Intelligence &amp; Innovation. I also am studying a minor in Film and TV!
            </p>
            <p className="m-0 leading-relaxed">
              I currently make music under the Artist title, &ldquo;Princesa&rdquo; (also my middle
              name!)
            </p>
            <div>
              <p className="m-0 mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Current focus:
              </p>
              <ul className="m-0 list-disc space-y-0.5 pl-4 text-[var(--text)]">
                {CURRENT_FOCUS.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p
                id="about-disclosure-hint"
                className="m-0 mb-1.5 text-[11px] leading-snug text-[var(--muted)]"
              >
                Tap a topic to open or close the list underneath.
              </p>
              <div className="flex flex-wrap gap-2">
              <button
                type="button"
                id="about-tech-toggle"
                aria-expanded={techToolkitOpen}
                aria-controls="about-tech-panel"
                aria-describedby="about-disclosure-hint"
                onClick={() => setTechToolkitOpen((o) => !o)}
                className={disclosureButtonClass}
              >
                <span className="min-w-0 flex-1">Technical toolkit!</span>
                <ExpandChevron expanded={techToolkitOpen} />
              </button>
              <button
                type="button"
                id="about-creative-toggle"
                aria-expanded={creativeToolkitOpen}
                aria-controls="about-creative-panel"
                aria-describedby="about-disclosure-hint"
                onClick={() => setCreativeToolkitOpen((o) => !o)}
                className={disclosureButtonClass}
              >
                <span className="min-w-0 flex-1">Creative toolkit!</span>
                <ExpandChevron expanded={creativeToolkitOpen} />
              </button>
              <button
                type="button"
                id="about-musical-toggle"
                aria-expanded={musicalBackgroundOpen}
                aria-controls="about-musical-panel"
                aria-describedby="about-disclosure-hint"
                onClick={() => setMusicalBackgroundOpen((o) => !o)}
                className={disclosureButtonClass}
              >
                <span className="min-w-0 flex-1">Musical background / creative practice</span>
                <ExpandChevron expanded={musicalBackgroundOpen} />
              </button>
              </div>
            </div>
            {techToolkitOpen ? (
              <div
                id="about-tech-panel"
                role="region"
                aria-labelledby="about-tech-toggle"
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
              >
                <ul className="m-0 list-disc space-y-0.5 pl-4 text-[var(--text)]">
                  {TECH_TOOLKIT.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {creativeToolkitOpen ? (
              <div
                id="about-creative-panel"
                role="region"
                aria-labelledby="about-creative-toggle"
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
              >
                <ul className="m-0 list-disc space-y-0.5 pl-4 text-[var(--text)]">
                  {CREATIVE_TOOLKIT.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {musicalBackgroundOpen ? (
              <div
                id="about-musical-panel"
                role="region"
                aria-labelledby="about-musical-toggle"
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
              >
                <ul className="m-0 list-disc space-y-0.5 pl-4 text-[var(--text)]">
                  {MUSICAL_BACKGROUND.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </AppWindow>
      ) : null}

      {projectsOpen ? (
        <AppWindow title="Projects" maxWidthClass="max-w-lg" onClose={() => setProjectsOpen(false)}>
          {!hasProjectsContent ? (
            <p className="m-0 leading-relaxed text-[var(--muted)]">
              Selected projects will appear here as links soon.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <p
                id="projects-expand-hint"
                className="m-0 text-[11px] leading-snug text-[var(--muted)]"
              >
                Tap a project below to expand details and links.
              </p>
              {WEBXR_WORLD_STAGES.length > 0 ? (
                <>
                  <button
                    type="button"
                    id="projects-webxr-toggle"
                    aria-expanded={webxrStagesOpen}
                    aria-controls="projects-webxr-panel"
                    aria-describedby="projects-expand-hint"
                    onClick={() => setWebxrStagesOpen((o) => !o)}
                    className={projectsDisclosureButtonClass}
                  >
                    <span className="min-w-0 flex-1 text-left">
                      AI-Generated WebXR World
                    </span>
                    <ExpandChevron expanded={webxrStagesOpen} />
                  </button>
                  {webxrStagesOpen ? (
                    <div
                      id="projects-webxr-panel"
                      role="region"
                      aria-labelledby="projects-webxr-toggle"
                      className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
                    >
                      <ul className="m-0 list-disc space-y-1 pl-4 text-[var(--text)]">
                        {WEBXR_WORLD_STAGES.map(({ label, href }) => (
                          <li key={href} className="leading-relaxed">
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="font-medium text-[var(--text)] underline-offset-2 hover:underline"
                            >
                              {label}
                            </a>
                          </li>
                        ))}
                      </ul>
                      <p className="m-0 mt-3 border-t border-[var(--border)] pt-3 text-sm leading-relaxed text-[var(--muted)]">
                        {WEBXR_PROJECT_DESCRIPTION}
                      </p>
                    </div>
                  ) : null}
                </>
              ) : null}
              {FRED_ROBOSCOUT_PARAGRAPHS.length > 0 ? (
                <>
                  <button
                    type="button"
                    id="projects-fred-toggle"
                    aria-expanded={fredRoboscoutOpen}
                    aria-controls="projects-fred-panel"
                    aria-describedby="projects-expand-hint"
                    onClick={() => setFredRoboscoutOpen((o) => !o)}
                    className={projectsDisclosureButtonClass}
                  >
                    <span className="min-w-0 flex-1 text-left">Fred, the RoboScout</span>
                    <ExpandChevron expanded={fredRoboscoutOpen} />
                  </button>
                  {fredRoboscoutOpen ? (
                    <div
                      id="projects-fred-panel"
                      role="region"
                      aria-labelledby="projects-fred-toggle"
                      className="flex flex-col gap-3 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
                    >
                      <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-[var(--text)]">
                        {FRED_ROBOSCOUT_PARAGRAPHS.map((paragraph, i) => (
                          <p key={i} className="m-0">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <a
                        href={FRED_ROBOSCOUT_DEMO_URL}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="rounded-md border border-[var(--border)] px-3 py-2 text-center text-sm font-medium text-[var(--text)] transition hover:bg-[var(--elevated)]"
                      >
                        YouTube demo (Short)
                      </a>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          )}
        </AppWindow>
      ) : null}

      {musicOpen ? (
        <AppWindow title="Music" onClose={() => setMusicOpen(false)}>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-[var(--border)] px-3 py-2 font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
          >
            Releases
          </a>
          <a
            href={SPOTIFY_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-[var(--border)] px-3 py-2 font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
          >
            Spotify
          </a>
          <a
            href={APPLE_MUSIC_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-[var(--border)] px-3 py-2 font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
          >
            Apple Music
          </a>
          <a
            href={CZARDAS_PERFORMANCE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-[var(--border)] px-3 py-2 font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
          >
            Monti&apos;s Czardas - Smith Center performance
          </a>
        </AppWindow>
      ) : null}
    </div>
  )
}
