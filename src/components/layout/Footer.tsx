import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-black/70 px-5 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <p className="font-display text-3xl font-medium md:text-5xl">
              Adwait M.
            </p>
            <p className="mt-3 max-w-sm font-serif text-lg italic text-neutral-400">
              Building at the intersection of AI and Markets.
            </p>
          </div>
          <div className="flex gap-16 font-display text-sm">
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Explore
              </p>
              <Link href="/#work" className="transition-colors hover:text-accent">
                Work
              </Link>
              <Link href="/skills" className="transition-colors hover:text-accent">
                Skills
              </Link>
              <Link href="/impact" className="transition-colors hover:text-accent">
                Impact
              </Link>
              <Link href="/case-studies" className="transition-colors hover:text-accent">
                Case Studies
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Connect
              </p>
              <a
                href="https://github.com/Addyy-M13"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/adwaitm1301/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href="mailto:adwait.m.1301@gmail.com"
                className="transition-colors hover:text-accent"
              >
                Email
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-neutral-900 pt-8 text-xs text-neutral-500">
          <p>© 2026 Adwait M. All rights reserved.</p>
          <p className="font-display">[ Est.2006 ]</p>
        </div>
      </div>
    </footer>
  )
}
