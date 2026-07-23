# my-portfolio

This is my personal site. Built it to actually show what I've been working on instead of just listing it on a resume. I'm a CS undergrad at BITS Pilani, mostly interested in ML systems and trading tools, and this repo is the Next.js app behind [adwait.site](https://adwait.site).

## what's on it

Three projects live here right now:

- **Stock backtester**: lets you test trading strategies against historical data, spits out Sharpe ratio and drawdown numbers so you're not just guessing if a strategy is any good.
- **Music genre classifier**: CNN trained on spectrograms, hits 94% on the test set. Started as a way to learn PyTorch properly and turned into something I kept improving.
- **AntarYatra**: a wellness platform I built end to end, journaling and mood tracking with an AI layer that reads across a bunch of Indian languages like Hindi, Tamil, and Bengali.

Each one has a case study page that goes into the actual architecture and what didn't work the first time.

## stack

- Next.js (App Router) + TypeScript
- Tailwind for styling
- Framer Motion for the animations
- A hand-written WebGL shader for the background pattern. No library, wanted to actually understand how it works.
- Python, PyTorch, scikit-learn on the ML side
- Deployed on Vercel

## running it locally

```bash
git clone https://github.com/adwaitm1301/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

Then open `localhost:3000`. Needs Node 18+.

For production build:

```bash
npm run build
npm start
```

## layout

```
src/
├── app/              Next.js routes (home, work, skills, impact, case-studies)
├── components/
│   ├── sections/     the actual page blocks: hero, about, FAQ, etc.
│   ├── shared/        reusable bits: nav, shader background, command palette
│   └── layout/        header/footer
├── data/              project + case study content
└── styles/            globals.css
```

## a few things worth poking at

- `Ctrl+K` opens a command palette for jumping around the site
- there's a couple of easter eggs hidden in here if you look for them
- the background is an animated shader, not a video or gif

## why this exists

Mostly because I wanted a place that actually reflects how I think about building things, not a template with my name swapped in. Still adding to it as I ship more.

If something's broken or you just want to talk about ML, markets, or systems stuff, reach out. Contact info's on the site.
