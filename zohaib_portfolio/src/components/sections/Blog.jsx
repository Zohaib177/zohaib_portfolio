import { motion, useReducedMotion } from 'framer-motion'
import { FiEdit3 } from 'react-icons/fi'
import BlogPostCard from '../common/BlogPostCard.jsx'
import Card from '../common/Card.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import SectionWrapper from '../layout/SectionWrapper.jsx'
import { blogPosts } from '../../data/blogData.js'

function Blog() {
  const shouldReduceMotion = useReducedMotion()
  const posts = [...blogPosts].sort(
    (first, second) => new Date(second.publishedAt) - new Date(first.publishedAt),
  )
  const hidden = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
  const visible = { opacity: 1, y: 0 }
  const viewport = { once: true, amount: 0.12 }
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.55,
    ease: [0.22, 1, 0.36, 1],
  }

  return (
    <SectionWrapper
      id="blog"
      ariaLabelledBy="blog-heading"
      className="section-divider bg-background-secondary/35"
    >
      <motion.div initial={hidden} whileInView={visible} viewport={viewport} transition={transition}>
        <SectionHeading
          id="blog-heading"
          eyebrow="Daily Notes"
          title="Blog"
          description="Short notes about what I am learning, building and discovering along the way."
        />
      </motion.div>

      {posts.length > 0 ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
                delayChildren: shouldReduceMotion ? 0 : 0.08,
              },
            },
          }}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={{ hidden, visible }} transition={transition}>
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div initial={hidden} whileInView={visible} viewport={viewport} transition={transition} className="mt-12">
          <Card className="flex flex-col items-start gap-5 border-dashed bg-card/70 sm:flex-row sm:items-center">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-control bg-accent/10 text-xl text-accent">
              <FiEdit3 aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-foreground">First post coming soon</h3>
              <p className="mt-2 max-w-2xl leading-7 text-muted">
                This blog is ready for daily updates. New learning notes and project insights will appear here.
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </SectionWrapper>
  )
}

export default Blog
