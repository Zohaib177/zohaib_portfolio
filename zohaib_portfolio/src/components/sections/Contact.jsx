import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { FiGithub, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiSend } from 'react-icons/fi'
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6'
import Badge from '../common/Badge.jsx'
import Button from '../common/Button.jsx'
import Card from '../common/Card.jsx'
import ContactMethod from '../common/ContactMethod.jsx'
import FormField from '../common/FormField.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import SectionWrapper from '../layout/SectionWrapper.jsx'
import { personalData } from '../../data/personalData.js'
import { getEmailAddress, isUsableContactLink } from '../../utils/contactLinks.js'

const initialForm = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
}

function validateField(name, value) {
  const cleanValue = value.trim()

  if (name === 'fullName') {
    if (!cleanValue) return 'Full name is required.'
    if (cleanValue.length < 2) return 'Full name must contain at least 2 characters.'
  }
  if (name === 'email') {
    if (!cleanValue) return 'Email address is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanValue)) {
      return 'Enter a valid email address.'
    }
  }
  if (name === 'subject') {
    if (!cleanValue) return 'Subject is required.'
    if (cleanValue.length < 3) return 'Subject must contain at least 3 characters.'
  }
  if (name === 'message') {
    if (!cleanValue) return 'Message is required.'
    if (cleanValue.length < 10) return 'Message must contain at least 10 characters.'
    if (cleanValue.length > 1500) return 'Message must not exceed 1500 characters.'
  }

  return ''
}

function Contact() {
  const [formValues, setFormValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [formState, setFormState] = useState('default')
  const [feedback, setFeedback] = useState('')
  const shouldReduceMotion = useReducedMotion()
  const hidden = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
  const visible = { opacity: 1, y: 0 }
  const viewport = { once: true, amount: 0.15 }
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.52,
    ease: [0.22, 1, 0.36, 1],
  }

  const emailAddress = getEmailAddress(personalData.socialLinks.email)
  const hasUsableEmail = isUsableContactLink(personalData.socialLinks.email)
  const hasUsableLinkedIn = isUsableContactLink(personalData.socialLinks.linkedin)
  const hasUsableGitHub = isUsableContactLink(personalData.socialLinks.github)
  const hasUsableInstagram = isUsableContactLink(personalData.socialLinks.instagram)
  const hasUsableX = isUsableContactLink(personalData.socialLinks.x)
  const hasUsableFacebook = isUsableContactLink(personalData.socialLinks.facebook)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({ ...current, [name]: value }))

    if (errors[name] && !validateField(name, value)) {
      setErrors((current) => {
        const nextErrors = { ...current }
        delete nextErrors[name]
        return nextErrors
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = Object.fromEntries(
      Object.entries(formValues)
        .map(([name, value]) => [name, validateField(name, value)])
        .filter(([, error]) => error),
    )

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      setFormState('error')
      setFeedback('Please correct the highlighted fields.')
      const fieldIds = {
        fullName: 'full-name',
        email: 'email-address',
        subject: 'subject',
        message: 'message',
      }
      const firstInvalidField = Object.keys(nextErrors)[0]
      window.requestAnimationFrame(() => {
        document.getElementById(fieldIds[firstInvalidField])?.focus()
      })
      return
    }

    setErrors({})
    if (!hasUsableEmail) {
      setFormState('error')
      setFeedback('The contact email is not configured yet.')
      return
    }

    setFormState('submitting')
    setFeedback('Sending your message...')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formValues.fullName.trim(),
          email: formValues.email.trim(),
          subject: formValues.subject.trim(),
          message: formValues.message.trim(),
          _subject: `Portfolio contact: ${formValues.subject.trim()}`,
          _template: 'table',
        }),
      })
      const result = await response.json().catch(() => null)

      if (!response.ok || result?.success === 'false') {
        throw new Error('Submission failed')
      }

      setFormValues(initialForm)
      setFormState('success')
      setFeedback('Thank you. Your message has been sent successfully.')
    } catch {
      setFormState('error')
      setFeedback('Your message could not be sent. Please try again or use WhatsApp.')
    }
  }

  return (
    <SectionWrapper
      id="contact"
      ariaLabelledBy="contact-heading"
      className="section-divider bg-background-secondary/35"
    >
      <motion.div initial={hidden} whileInView={visible} viewport={viewport} transition={transition}>
        <SectionHeading
          id="contact-heading"
          eyebrow="Get in Touch"
          title="Let’s Connect and Build Something Useful"
          description="I am open to internships, learning opportunities, project discussions and professional connections related to software development and data science."
        />
      </motion.div>

      <div className="mt-12 grid items-start gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
        <motion.div
          initial={hidden}
          whileInView={visible}
          viewport={viewport}
          transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.08 }}
          className="space-y-5"
        >
          <Card className="bg-card-elevated">
            <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Have an internship opportunity, software project idea or data-related discussion? You can contact me through email, LinkedIn or GitHub.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <ContactMethod
                icon={<FiMail />}
                label="Email"
                text={emailAddress}
                href={hasUsableEmail ? `mailto:${emailAddress}` : null}
                unavailableText="Add email in personalData.js"
              />
              <ContactMethod
                icon={<FiLinkedin />}
                label="LinkedIn"
                text="View professional profile"
                href={hasUsableLinkedIn ? personalData.socialLinks.linkedin : null}
                external
                unavailableText="Add LinkedIn URL in personalData.js"
              />
              <ContactMethod
                icon={<FiGithub />}
                label="GitHub"
                text="View code and projects"
                href={hasUsableGitHub ? personalData.socialLinks.github : null}
                external
                unavailableText="Add GitHub URL in personalData.js"
              />
              <ContactMethod
                icon={<FiInstagram />}
                label="Instagram"
                text="View Instagram profile"
                href={hasUsableInstagram ? personalData.socialLinks.instagram : null}
                external
                unavailableText="Add Instagram URL in personalData.js"
              />
              <ContactMethod
                icon={<FaXTwitter />}
                label="X (Twitter)"
                text="View X profile"
                href={hasUsableX ? personalData.socialLinks.x : null}
                external
                unavailableText="Add X URL in personalData.js"
              />
              <ContactMethod
                icon={<FaFacebookF />}
                label="Facebook"
                text="View Facebook profile"
                href={hasUsableFacebook ? personalData.socialLinks.facebook : null}
                external
                unavailableText="Add Facebook URL in personalData.js"
              />
              <ContactMethod
                icon={<FiMapPin />}
                label="Location"
                text={personalData.location}
                unavailableText={personalData.location}
              />
            </div>
          </Card>

          <Card className="border-green-400/20 bg-green-500/[0.05]">
            <div className="flex items-start gap-3">
              <span className="mt-2 size-2 shrink-0 rounded-full bg-success" aria-hidden="true" />
              <div>
                <Badge variant="success">Open to Opportunities</Badge>
                <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                  Currently open to internships and professional learning opportunities.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={hidden}
          whileInView={visible}
          viewport={viewport}
          transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.14 }}
        >
          <Card className="bg-card-elevated p-5 sm:p-7 lg:p-8">
            <h3 className="text-xl font-semibold text-foreground">Send Me a Message</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Complete the form and your message will be delivered to my contact email.
            </p>

            <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
              <FormField
                id="full-name"
                label="Full Name"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={formValues.fullName}
                error={errors.fullName}
                onChange={handleChange}
              />
              <FormField
                id="email-address"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                value={formValues.email}
                error={errors.email}
                onChange={handleChange}
              />
              <FormField
                id="subject"
                label="Subject"
                name="subject"
                type="text"
                autoComplete="off"
                placeholder="What would you like to discuss?"
                value={formValues.subject}
                error={errors.subject}
                onChange={handleChange}
                className="sm:col-span-2"
              />
              <FormField
                id="message"
                label="Message"
                name="message"
                as="textarea"
                autoComplete="off"
                maxLength={1500}
                placeholder="Write your message here"
                value={formValues.message}
                error={errors.message}
                onChange={handleChange}
                className="sm:col-span-2"
              />

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  size="large"
                  rightIcon={<FiSend />}
                  disabled={formState === 'submitting'}
                  className="w-full"
                >
                  {formState === 'submitting' ? 'Sending Message...' : 'Submit Message'}
                </Button>
                <p
                  className={`mt-4 min-h-6 text-sm ${
                    formState === 'error'
                      ? 'font-medium text-red-300'
                      : formState === 'success'
                        ? 'font-medium text-green-300'
                        : 'text-foreground-secondary'
                  }`}
                  aria-live="polite"
                  role={formState === 'error' ? 'alert' : 'status'}
                >
                  {feedback}
                </p>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

export default Contact
