export interface Project {
  id: string
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

export interface Service {
  id: string
  title: string
  description: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  link: string
}

export interface Reading {
  id: string
  title: string
  author: string
  source: string
  insight: string
  category: 'research' | 'article' | 'paper'
  date: string
  link: string
}
