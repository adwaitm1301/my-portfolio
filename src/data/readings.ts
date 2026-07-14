import { Reading } from '@/lib/types'

export const readings: Reading[] = [
  {
    id: 'reading-1',
    title: 'Attention Is All You Need',
    author: 'Vaswani et al.',
    source: 'arxiv.org',
    insight: 'The transformer architecture that powers modern LLMs. A foundational paper on how attention mechanisms can replace RNNs entirely.',
    category: 'paper',
    date: 'Jul 2024',
    link: 'https://arxiv.org/abs/1706.03762',
  },
  {
    id: 'reading-2',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    source: 'Book',
    insight: 'Essential reading for anyone building products. The iterative approach to startup development and validated learning.',
    category: 'article',
    date: 'Jun 2024',
    link: 'https://theleanstartup.com/',
  },
  {
    id: 'reading-3',
    title: 'Efficient Transformers: A Survey',
    author: 'Tay et al.',
    source: 'arxiv.org',
    insight: 'Deep dive into optimizations for transformer models. Important for understanding how to scale LLMs efficiently.',
    category: 'paper',
    date: 'May 2024',
    link: 'https://arxiv.org/abs/2009.06732',
  },
]
