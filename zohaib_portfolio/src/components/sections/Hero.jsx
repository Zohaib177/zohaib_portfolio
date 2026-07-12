import { motion, useReducedMotion } from 'framer-motion'
import {
  FiArrowUpRight,
  FiCode,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMessageSquare,
} from 'react-icons/fi'
import Badge from '../common/Badge.jsx'
import Button from '../common/Button.jsx'
import ScrollLink from '../common/ScrollLink.jsx'
import SocialLink from '../common/SocialLink.jsx'
import SectionWrapper from '../layout/SectionWrapper.jsx'
import { personalData } from '../../data/personalData.js'
import { isUsableContactLink } from '../../utils/contactLinks.js'

const technologies = ['Python', 'React', 'Flutter', 'FastAPI', 'MySQL']

function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const initial = shouldReduceMotion ? false : { opacity: 0, y: 18 }
  const reveal = { opacity: 1, y: 0 }
  const transition = (delay = 0) => ({
    duration: shouldReduceMotion ? 0 : 0.55,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  })
  const hasGitHub = isUsableContactLink(personalData.socialLinks.github)
  const hasLinkedIn = isUsableContactLink(personalData.socialLinks.linkedin)
  const hasEmail = isUsableContactLink(personalData.socialLinks.email)
  const hasSocialLinks = hasGitHub || hasLinkedIn || hasEmail

  return (
    <SectionWrapper
      id="home"
      ariaLabelledBy="hero-heading"
      className="relative flex min-h-[calc(100svh-72px)] items-center overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -top-36 left-[8%] -z-10 size-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[2%] bottom-0 -z-10 size-72 rounded-full bg-accent-secondary/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-20">
        <div className="min-w-0">
          <motion.div initial={initial} animate={reveal} transition={transition(0.05)}>
            <Badge variant="success" className="gap-2 py-1.5">
              <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
              {personalData.availability}
            </Badge>
          </motion.div>

          <motion.p
            initial={initial}
            animate={reveal}
            transition={transition(0.12)}
            className="mt-7 text-base font-semibold text-accent sm:text-lg"
          >
            {personalData.greeting}
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={initial}
            animate={reveal}
            transition={transition(0.18)}
            className="mt-2 font-heading text-[clamp(2.75rem,9vw,5.75rem)] leading-[0.98] font-bold tracking-[-0.055em] text-gradient"
          >
            {personalData.name}
          </motion.h1>

          <motion.div
            initial={initial}
            animate={reveal}
            transition={transition(0.24)}
            className="mt-6"
          >
            <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] font-semibold text-foreground">
              {personalData.primaryRole} <span className="text-muted">&amp;</span>{' '}
              {personalData.roles[0]}
            </h2>
            <p className="mt-2 font-medium text-foreground-secondary">
              {personalData.roles.slice(1).join(' • ')}
            </p>
          </motion.div>

          <motion.p
            initial={initial}
            animate={reveal}
            transition={transition(0.3)}
            className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8"
          >
            {personalData.description}
          </motion.p>

          <motion.div
            initial={initial}
            animate={reveal}
            transition={transition(0.36)}
            className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap"
          >
            <ScrollLink
              sectionId="projects"
              size="large"
              rightIcon={<FiArrowUpRight />}
              className="w-full xs:w-auto"
            >
              View My Projects
            </ScrollLink>
            <ScrollLink
              sectionId="contact"
              variant="outline"
              size="large"
              leftIcon={<FiMessageSquare />}
              className="w-full xs:w-auto"
            >
              Contact Me
            </ScrollLink>
            {personalData.resumePath && (
              <Button
                href={personalData.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="large"
                rightIcon={<FiExternalLink />}
                className="w-full xs:w-auto"
                aria-label="View Zohaib Akhtar's resume PDF in a new tab"
              >
                View Resume
              </Button>
            )}
          </motion.div>

          {hasSocialLinks && (
            <motion.div
              initial={initial}
              animate={reveal}
              transition={transition(0.42)}
              className="mt-7 flex items-center gap-3"
              aria-label="Social links"
            >
              {hasGitHub && (
                <SocialLink
                  href={personalData.socialLinks.github}
                  label="Visit Zohaib Akhtar's GitHub profile"
                  icon={<FiGithub />}
                />
              )}
              {hasLinkedIn && (
                <SocialLink
                  href={personalData.socialLinks.linkedin}
                  label="Visit Zohaib Akhtar's LinkedIn profile"
                  icon={<FiLinkedin />}
                />
              )}
              {hasEmail && (
                <SocialLink
                  href={personalData.socialLinks.email}
                  label="Email Zohaib Akhtar"
                  icon={<FiMail />}
                />
              )}
            </motion.div>
          )}

          <motion.div
            initial={initial}
            animate={reveal}
            transition={transition(0.48)}
            className="mt-8 flex flex-col gap-3 border-t border-border-subtle pt-5 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-7"
          >
            <p className="flex items-center gap-2">
              <FiMapPin className="shrink-0 text-accent" aria-hidden="true" />
              Based in {personalData.location}
            </p>
            <p className="flex items-center gap-2">
              <FiCode className="shrink-0 text-accent" aria-hidden="true" />
              Focused on Data Science, Web and Mobile Development
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reveal}
          transition={transition(0.26)}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
          aria-hidden="true"
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
            }
            className="professional-border soft-blue-glow relative overflow-hidden rounded-[1.25rem] bg-card/95 shadow-card"
          >
            <div className="flex h-11 items-center gap-2 border-b border-border-subtle bg-card-elevated px-4">
              <span className="size-2.5 rounded-full bg-error/75" />
              <span className="size-2.5 rounded-full bg-amber-400/75" />
              <span className="size-2.5 rounded-full bg-success/75" />
              <span className="ml-3 font-mono text-xs text-muted">developer.js</span>
            </div>

            <div className="p-5 sm:p-7">
              <div className="border-b border-border-subtle pb-5">
                <p className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  {personalData.name}
                </p>
                <p className="mt-1 text-sm text-foreground-secondary">
                  {personalData.primaryRole}
                </p>
                <p className="mt-0.5 text-sm text-accent">{personalData.roles[0]}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {technologies.map((technology) => (
                    <Badge key={technology} variant="primary">
                      {technology}
                    </Badge>
                  ))}
                </div>
              </div>

              <pre className="mt-5 overflow-hidden font-mono text-[0.7rem] leading-6 text-foreground-secondary sm:text-xs">
                <code>{`const developer = {
  name: "Zohaib Akhtar",
  degree: "BS Data Science",
  focus: [
    "Software Development",
    "Data Science",
    "Full Stack Development"
  ],
  learning: true
};`}</code>
              </pre>
            </div>
          </motion.div>

          <span className="absolute -top-5 right-8 hidden rounded-full border border-border-subtle bg-card-elevated px-3 py-1.5 text-xs font-medium text-blue-300 shadow-card lg:block">
            Python
          </span>
          <span className="absolute top-1/3 -right-5 hidden rounded-full border border-border-subtle bg-card-elevated px-3 py-1.5 text-xs font-medium text-violet-300 shadow-card xl:block">
            Data Science
          </span>
          <span className="absolute -bottom-4 left-8 hidden rounded-full border border-border-subtle bg-card-elevated px-3 py-1.5 text-xs font-medium text-blue-300 shadow-card lg:block">
            React + Flutter
          </span>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

export default Hero
