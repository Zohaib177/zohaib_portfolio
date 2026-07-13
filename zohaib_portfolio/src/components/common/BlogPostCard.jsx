import { FiCalendar, FiChevronDown, FiClock } from 'react-icons/fi'
import Badge from './Badge.jsx'
import Card from './Card.jsx'

function formatDate(date) {
  return new Intl.DateTimeFormat('en-PK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

function getReadingTime(post) {
  const wordCount = [post.excerpt, ...(post.content ?? [])]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(wordCount / 200))
}

function BlogPostCard({ post }) {
  const hasContent = Array.isArray(post.content) && post.content.length > 0

  return (
    <article>
      <Card hover className="h-full p-0">
        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <FiCalendar aria-hidden="true" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <FiClock aria-hidden="true" />
              {getReadingTime(post)} min read
            </span>
          </div>

          {post.category && (
            <div className="mt-5">
              <Badge variant="primary">{post.category}</Badge>
            </div>
          )}

          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-foreground">
            {post.title}
          </h3>
          <p className="mt-3 leading-7 text-foreground-secondary">{post.excerpt}</p>

          {post.tags?.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Topics in ${post.title}`}>
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Badge>{tag}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        {hasContent && (
          <details className="group border-t border-border-subtle">
            <summary className="focus-ring flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-b-card px-6 py-3 font-semibold text-accent transition-colors hover:bg-white/[0.03] sm:px-7 [&::-webkit-details-marker]:hidden">
              Read full post
              <FiChevronDown
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <div className="space-y-4 px-6 pb-7 text-foreground-secondary sm:px-7">
              {post.content.map((paragraph, index) => (
                <p key={`${post.id}-paragraph-${index}`} className="leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </details>
        )}
      </Card>
    </article>
  )
}

export default BlogPostCard
