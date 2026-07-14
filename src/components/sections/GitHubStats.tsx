'use client'

import { useEffect, useState } from 'react'
import Reveal from '@/components/shared/Reveal'
import { motion } from 'framer-motion'

interface GitHubRepo {
  name: string
  description: string
  url: string
  stars: number
  language: string
}

interface GitHubUser {
  followers: number
  publicRepos: number
  contributions: number
}

export default function GitHubStats() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [userStats, setUserStats] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const username = 'Addyy-M13'

        // Fetch user stats
        const userRes = await fetch(`https://api.github.com/users/${username}`)
        if (!userRes.ok) throw new Error('Failed to fetch user')
        const userData: any = await userRes.json()

        setUserStats({
          followers: userData.followers || 0,
          publicRepos: userData.public_repos || 0,
          contributions: userData.public_repos || 0,
        })

        // Fetch top repos
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=stars&direction=desc&per_page=6`
        )
        if (!reposRes.ok) throw new Error('Failed to fetch repos')
        const reposData: any[] = await reposRes.json()

        const formattedRepos: GitHubRepo[] = (Array.isArray(reposData) ? reposData : [])
          .slice(0, 6)
          .map((repo: any) => ({
            name: repo.name || 'Unknown',
            description: repo.description || 'No description',
            url: repo.html_url || '#',
            stars: repo.stargazers_count || 0,
            language: repo.language || 'Unknown',
          }))

        setRepos(formattedRepos)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
        // Hide stats rather than showing fake numbers
        setUserStats(null)
        setRepos([])
        setLoading(false)
      }
    }

    fetchGitHub()
  }, [])

  return (
    <section className="px-5 py-24 bg-neutral-950/60 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
              Open Source
            </h2>
            <span className="text-3xl">📦</span>
          </div>
          <p className="mb-16 font-serif italic text-lg text-neutral-400">
            Pulled live from the GitHub API. Nothing curated, nothing staged.
          </p>
        </Reveal>

        {/* GitHub Stats Overview */}
        {userStats && !loading && (
          <Reveal delay={0.1}>
            <div className="grid grid-cols-3 gap-4 mb-16">
              {[
                { label: 'Followers', value: userStats.followers },
                { label: 'Public Repos', value: userStats.publicRepos },
                { label: 'Projects', value: userStats.contributions },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="border border-neutral-800 rounded-lg p-4 text-center bg-black/50 hover:border-accent/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <p className="font-display text-3xl font-medium text-accent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-neutral-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Top Repos */}
        <Reveal delay={0.2}>
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-medium text-white mb-6">
              Top Projects
            </h3>
            {repos.map((repo, idx) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-neutral-800 rounded-lg p-6 hover:border-accent/50 transition-colors bg-black/50 hover:bg-black/70"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + idx * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-display font-medium text-white group-hover:text-accent transition-colors">
                        {repo.name}
                      </h4>
                      {repo.stars > 0 && (
                        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                          ⭐ {repo.stars}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-400 truncate">
                      {repo.description}
                    </p>
                  </div>
                  <span className="text-xs text-neutral-500 whitespace-nowrap ml-4">
                    {repo.language}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.3} className="mt-12">
          <div className="text-center">
            <a
              href="https://github.com/Addyy-M13"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent/90 text-black font-display font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105"
            >
              View Full GitHub Profile
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
