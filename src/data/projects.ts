import { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    id: 'stock-backtester',
    title: 'Stock Backtester',
    description:
      'A high-performance backtesting engine for trading strategies. Analyze historical market data and validate your trading logic.',
    image:
      'https://framerusercontent.com/images/mJLkkqjsD7fpTZpMGr5rke9X5yk.jpg?scale-down-to=1024',
    link: '/work/stock-backtester',
    tags: ['Python', 'Finance', 'Backtesting'],
  },
  {
    id: 'music-genre-classifier',
    title: 'Music Genre Classifier',
    description:
      'Machine learning model that classifies music genres using audio features. Built with neural networks for accurate genre prediction.',
    image:
      'https://framerusercontent.com/images/5wuNy71YdCIuEbVVynv6lJpJ1dY.jpg?scale-down-to=1024',
    link: '/work/music-genre-classifier',
    tags: ['ML', 'Audio', 'Deep Learning'],
  },
  {
    id: 'antaryatra',
    title: 'AntarYatra',
    description:
      'AI-powered mental wellness and journaling platform for students. Real-time emotional insights across 12+ Indian languages.',
    image:
      'https://framerusercontent.com/images/MtIaN53bNrgNKXXvdrGD6gHwWrM.jpg?scale-down-to=1024',
    link: '/work/antaryatra',
    tags: ['Full-Stack', 'Web', 'Platform'],
  },
]
