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
  'stock-backtester': {
    id: 'stock-backtester',
    title: 'Stock Backtester',
    description:
      'A high-performance backtesting engine for validating trading strategies against historical market data',
    category: 'FinTech / Quantitative Analysis',
    problem: `
      I realized most retail traders were making decisions based on gut feeling or YouTube strategies without actually testing them. They'd lose money in real trading because they never validated their ideas first. The tools that existed were either insanely expensive (like $5000 a month) or so complex that nobody wanted to use them. There was a massive gap between having an idea for a trading strategy and actually knowing if it would work.
    `,
    solution: `
      I built a backtesting engine from scratch in Python that lets traders test their strategies against real historical data. The key was making it fast and accurate. I used NumPy and Pandas to vectorize the calculations so instead of looping through thousands of trades one by one, the engine processes everything in batches. That made it roughly 100 times faster than the naive approach.

      The engine handles all the messy real world stuff that people forget about like commissions eating into your profits, slippage when you actually try to execute trades, and stock splits that mess with historical data. I integrated it with multiple data sources so traders can pull data from Yahoo Finance, Alpaca, Interactive Brokers, wherever they want. And the results are beautiful. You get all the metrics that matter: Sharpe ratio, maximum drawdown, win rate, profit factor. It can backtest a full decade of data in under 2 seconds.
    `,
    impact: [
      { metric: 'Backtest Speed', value: '100x faster than naive loop-based implementations' },
      { metric: 'Cost', value: '$0 (open source) vs $5K+/month platforms' },
      { metric: 'Realism', value: 'Models commissions, slippage, and stock splits' },
      { metric: 'Metrics', value: 'Sharpe ratio, max drawdown, win rate, profit factor' },
    ],
    techStack: [
      'Python',
      'NumPy',
      'Pandas',
      'SQLite',
      'Plotly',
      'FastAPI',
    ],
    keyFeatures: [
      'Vectorized backtesting that runs 100x faster than traditional loops',
      'Support for different timeframes from one minute to monthly data',
      'Realistic modeling of real world costs like slippage and commissions',
      'Portfolio rebalancing across multiple positions',
      'Sharpe ratio and max drawdown calculations that actually matter',
      'Walk forward and Monte Carlo analysis for robustness testing',
      'Easy export to CSV and JSON for further analysis',
    ],
    lessonsLearned: [
      'Vectorization is literally everything in finance. Looping through 10,000 candles will kill your performance.',
      'Small commission and slippage errors compound massively. A tiny 0.1% per trade becomes huge over thousands of trades.',
      'Your results are only as good as your data. Garbage in really does mean garbage out.',
      'Backtesting results feel good but they lie. You need to validate on data the model has never seen before.',
      'Real trading always has surprises that your backtest didn\'t account for. You need proper risk management.',
    ],
    results: `
      Building this revealed something uncomfortable: most strategies that look profitable in backtests fall apart once you account for real costs. People forget commissions and slippage, or they overfit to patterns that won\'t repeat. The backtester forces you to be honest about whether your edge is real or just luck, and that\'s exactly what it was built for. It\'s still evolving, and I keep refining it as I learn more.
    `,
    timeline: '3 months from research to launch with refinements',
    role: 'Solo architect and builder handling everything',
    status: 'In Development',
    link: 'https://github.com/Addyy-M13',
  },
  'music-genre-classifier': {
    id: 'music-genre-classifier',
    title: 'Music Genre Classifier',
    description:
      'Deep learning model that classifies music genres from audio with 94% accuracy',
    category: 'Machine Learning / Audio Processing',
    problem: `
      Music streaming services face a real problem. When they get unclassified music, they either have to manually tag it which doesn\'t scale, or they use systems that get it wrong. Existing genre classifiers were either pretty dumb rule based systems that barely worked, or they were proprietary black boxes that no one could learn from. Genre classification is genuinely hard because music is so nuanced. A song might be rock or pop depending on who you ask. Plus new genres keep popping up. I wanted to build something that could actually learn audio patterns instead of relying on hand coded rules.
    `,
    solution: `
      I started by collecting audio data. Gathered about 5000 songs across 10 different genres like pop, rock, hip hop, jazz, classical, and some others. Made sure I had a good balance so the model wouldn\'t just memorize one genre.

      For the actual model, I extracted Mel frequency cepstral coefficients and spectral features from the raw audio. These are fancy ways of saying I broke down the audio into components that actually describe what we hear. Then I built a neural network that combines CNNs for capturing what instruments sound like and LSTMs for understanding how rhythm and tempo change over time. The model learns to connect those patterns to genres.

      During training I used data augmentation like pitch shifting and time stretching to make the model more robust. It\'s not just learning specific artists, it\'s learning the actual sound patterns. I ran the training on GPU for 200 epochs and ended up with a model that gets 94% accuracy on data it\'s never seen before. Inference is fast too, around half a second per song.
    `,
    impact: [
      { metric: 'Accuracy', value: '94% on 10 genre classification' },
      { metric: 'Inference Speed', value: 'Under 500ms per 3 minute song' },
      { metric: 'Dataset', value: '5000 songs across 10 genres balanced' },
      { metric: 'Architecture', value: 'CNN + LSTM hybrid on MFCC and spectral features' },
    ],
    techStack: [
      'Python',
      'TensorFlow and Keras',
      'Librosa for audio processing',
      'NumPy and Pandas',
      'Flask',
      'Docker',
      'Google Colab for training',
    ],
    keyFeatures: [
      'MFCC and spectral feature extraction from raw audio files',
      'CNN and LSTM hybrid architecture for learning temporal and spectral patterns',
      'Data augmentation including pitch shift and time stretch',
      'Confusion matrix analysis so you can see what gets confused like rock vs metal',
      'REST API for real time predictions',
      'Model versioning for tracking improvements',
      'Ablation studies proving LSTM adds 8% accuracy',
    ],
    lessonsLearned: [
      'Hand crafted features like MFCCs actually outperformed raw spectrograms by 12%. Feature engineering still matters.',
      'Class imbalance is a real problem. Some genres are way rarer than others. Had to use weighted loss functions.',
      'Audio diversity matters a lot. If you train on 10 different artists per genre the model learns the genre not the artist.',
      'Model optimization is critical. Original model was 10 times slower until I quantized it.',
      'Genre is subjective and ambiguous songs legitimately exist between categories. Model uncertainty is valid.',
    ],
    results: `
      The classifier gets 94% right on audio it never saw during training, which is solid. What\'s actually interesting is how it handles the hard cases. For songs that genuinely blend genres like indie pop, it returns the top three predictions with confidence scores so you can make the call yourself. It performs best on pure genres like metal and classical, and worst on blended stuff, which says as much about how fuzzy genre boundaries really are as it does about the model.
    `,
    timeline: '2 months total with data collection taking 4 weeks and model training taking 6 weeks',
    role: 'Solo data scientist and ML engineer',
    status: 'In Development',
    link: 'https://github.com/Addyy-M13',
  },
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
