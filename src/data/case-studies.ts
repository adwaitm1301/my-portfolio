export interface CaseStudy {
  id: string
  title: string
  description: string
  category: string
  problem: string
  solution: string
  impact: {
    metric: string
    value: string
  }[]
  techStack: string[]
  keyFeatures: string[]
  lessonsLearned: string[]
  results: string
  timeline: string
  role: string
  status: 'Completed' | 'Live' | 'In Development'
  link?: string
}

export const caseStudies: Record<string, CaseStudy> = {
  'antaryatra': {
    id: 'antaryatra',
    title: 'AntarYatra',
    description:
      'AI-powered mental wellness and journaling platform with real-time emotional insights in 12+ Indian languages',
    category: 'HealthTech / AI / Full-Stack',
    problem: `
      Mental health issues are silent killers especially for students. People are anxious and stressed and exhausted but they don\'t have anywhere to actually process those feelings. Therapy is expensive and hard to access. Generic meditation apps are surface level and don\'t teach you anything about yourself. Most importantly, people want to journal because it helps but they don\'t know where to start. They need someone or something to guide them to dig deeper. They need to actually understand their patterns instead of just venting. And they need to feel less alone.

      I built AntarYatra to solve this. It\'s specifically designed for Indian students because mental health needs are culturally specific and most people respond better to apps in their own language.
    `,
    solution: `
      I created a full stack platform that puts AI at the center of the mental wellness journey.

      On the frontend, I built a React app that feels calm and minimal. No overwhelming dashboards. Just journaling with AI guided prompts that help you actually dig into what you\'re feeling. Real time mood tracking using emojis that then let you be more detailed. An analytics view showing patterns over time so you can see that you\'re more anxious on Mondays or that exercise actually helps.

      The backend runs on Node and Express with MongoDB storing all the journals. Redis caches common queries so it stays fast. For authentication I used JWT with encrypted sessions so it\'s secure.

      The AI engine is the real magic. I built it on top of open source language models but fine tuned it to understand emotional nuance. The system analyzes your journal entries to detect emotions, then looks for patterns. It tells you things like you mention anxiety 40% more on Mondays, or your mood improves noticeably after you exercise. For the community side, I anonymize everything so people can share safely with others.

      I also spent time on localization. The app supports 12+ Indian languages including Hindi, Tamil, Telugu, and Bengali. When you write in your language, the AI analyzes it in that language and returns insights in your language. Language detection happens automatically. I deployed the frontend on Vercel and the backend on Railway, which auto scales when load spikes, so the architecture is built to handle exam-season surges without falling over.
    `,
    impact: [
      { metric: 'Languages', value: '12+ Indian languages with automatic detection' },
      { metric: 'Cost to Students', value: 'Free, therapy-adjacent support without the price tag' },
      { metric: 'Privacy', value: 'End-to-end encrypted, anonymized community, no data selling' },
      { metric: 'Status', value: 'In active development' },
    ],
    techStack: [
      'React',
      'TypeScript',
      'Node.js and Express',
      'MongoDB',
      'Redis',
      'Python for AI backend',
      'Hugging Face Transformers',
      'Vercel and Railway',
    ],
    keyFeatures: [
      'AI guided journaling prompts tailored to your current mood',
      'Real time emotion detection that actually understands nuance',
      'Mood tracking with beautiful visualizations showing trends',
      'Pattern recognition like noticing you\'re stressed on Sundays',
      'Anonymous community so you can share safely with peers',
      'Rewards and achievements that gamify wellness in a good way',
      'Privacy first with end to end encryption no data selling',
      'Support for 12+ Indian languages',
      'Mobile responsive design that works everywhere',
      'Export journals as PDF to keep them',
    ],
    lessonsLearned: [
      'Mental health data is sacred. Privacy can\'t be a second thought, it has to be built in from day one.',
      'AI predictions need to be transparent. People need to understand why the app is telling them something not just trust it blindly.',
      'Community moderation is hard. Bad actors exist. AI filtering plus review is the only way to keep a space safe.',
      'Language matters deeply. Direct translations miss emotional nuance, the AI has to understand each language natively.',
      'Accessibility isn\'t nice to have. Dark mode, font sizes, keyboard navigation are essential.',
      'User feedback drives design. The best features came from things students actually asked for.',
    ],
    results: `
      AntarYatra is my most ambitious build so far and it is still a work in progress. The goal is simple: help students actually understand their own patterns instead of just venting into a void.

      Most importantly, it starts conversations about mental health in a space where students often feel like they can\'t talk about this stuff. Building an app that analyzes emotion in Hindi or Tamil as naturally as English was the hardest and most rewarding part. Direct translation misses emotional nuance, so the AI had to be built for each language, not just translated into it.
    `,
    timeline: '4 months from planning through development to launch',
    role: 'Full stack engineer, AI specialist, and product lead',
    status: 'In Development',
    link: 'https://antaryatra-in.vercel.app',
  },
}
