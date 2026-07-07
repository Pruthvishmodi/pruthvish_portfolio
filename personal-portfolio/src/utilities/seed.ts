// @ts-nocheck
import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function getOrCreateImage(payload: any): Promise<number> {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'Pruthvish Profile' } },
  })
  if (existing.docs.length > 0) {
    return existing.docs[0].id
  }

  let buffer: Buffer
  try {
    const res = await fetch('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500')
    buffer = Buffer.from(await res.arrayBuffer())
  } catch (e) {
    buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64')
  }

  const mediaDoc = await payload.create({
    collection: 'media',
    data: {
      alt: 'Pruthvish Profile',
    },
    file: {
      data: buffer,
      name: 'pruthvish.jpg',
      mimetype: 'image/jpeg',
      size: buffer.length,
    },
  })

  return mediaDoc.id
}

async function run() {
  console.log('Seeding database...')
  const payload = await getPayload({ config: configPromise })

  const profileImageId = await getOrCreateImage(payload)

  // Clean existing portfolios
  const existingPortfolios = await payload.find({
    collection: 'portfolios',
    limit: 100,
  })
  for (const port of existingPortfolios.docs) {
    await payload.delete({
      collection: 'portfolios',
      id: port.id,
    })
  }

  // Seed mock portfolios
  console.log('Creating portfolio items...')
  const craveable = await payload.create({
    collection: 'portfolios',
    data: {
      title: 'Craveable: Food Delivery Reimagined',
      domain: ['Other'],
      customDomain: 'Food Tech',
      shortDescription: 'A sleek mobile application design reimagining the food delivery user journey.',
      techStack: ['React Native', 'TypeScript'],
      screenshots: [{ image: profileImageId }],
      _status: 'published',
    },
  })

  const solstice = await payload.create({
    collection: 'portfolios',
    data: {
      title: 'Solstice: High-Fashion Editorial Web',
      domain: ['Other'],
      customDomain: 'Fashion',
      shortDescription: 'A modern layout presenting editorials and fashion lookbooks.',
      techStack: ['React', 'Next.js'],
      screenshots: [{ image: profileImageId }],
      _status: 'published',
    },
  })

  const aether = await payload.create({
    collection: 'portfolios',
    data: {
      title: 'Aether: Systematic Brand Evolution',
      domain: ['Other'],
      customDomain: 'Branding',
      shortDescription: 'A clean system-oriented redesign showing a unified brand image.',
      techStack: ['Other'],
      customTechStack: [{ tech: 'Figma' }],
      screenshots: [{ image: profileImageId }],
      _status: 'published',
    },
  })

  // Clean existing pages
  const existingPages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
  })
  for (const page of existingPages.docs) {
    await payload.delete({
      collection: 'pages',
      id: page.id,
    })
  }

  console.log('Creating home page...')
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      layout: [
        {
          blockType: 'personalPortfolio',
          hero: {
            badgeText: 'Hello, my name is',
            titlePreHighlight: 'I’m',
            titleHighlight: 'Pruthvish Modi',
            description: "I'm Sr.Software Developer and I hold expertise in making digital space more interactive through coding..",
            experienceYears: '9',
            experienceLabel: 'YEARS OF EXPERIENCE',
            certificationTitle: '15',
            certificationLabel: 'COMPLETED PROJECTS',
            stat3Number: '50',
            stat3Label: 'CORPORATE TRAINING',
            stat4Number: '300',
            stat4Label: 'HOURS OF ONLINE TRAINING',
            sayHiLabel: 'CONTACT ME',
            sayHiLink: '#contact',
            downloadCvLabel: 'Download CV',
            heroImage: profileImageId,
          },
          skillsTitle: 'My Expertise that provides Value',
          skillsDescription: "Having accumulated a wealth of experience spanning over 9+ years in the corporate landscape, I can readily attest to having engaged with a diverse array of technologies. Throughout my journey, I've actively embraced and navigated through numerous technological domains, making me a versatile player in this dynamic field. The proficiencies highlighted in this context accurately reflect the areas where I have honed my expertise, showcasing the depth of my skillset and underscoring my ability to excel in multifaceted roles.",
          marqueeSkills: [
            { label: 'AWS LAMBDA', icon: 'bolt', proficiency: 70 },
            { label: 'GRAPHQL', icon: 'hub', proficiency: 80 },
            { label: 'MONGODB', icon: 'database', proficiency: 80 },
            { label: 'NODE JS', icon: 'code', proficiency: 80 },
            { label: 'REACT NATIVE', icon: 'smartphone', proficiency: 80 },
            { label: 'HTML 5', icon: 'html', proficiency: 100 },
            { label: 'JAVASCRIPT / TYPESCRIPT', icon: 'code', proficiency: 100 },
            { label: 'RECT JS 19 / NEXTJS 15', icon: 'code', proficiency: 90 },
            { label: 'POSTGRESQL / REDID', icon: 'database', proficiency: 90 },
          ],
          coreMastery: [
            { title: 'Figma', subtitle: 'Design System', icon: 'brush', color: 'primary' },
            { title: 'React', subtitle: 'Frontend Dev', icon: 'code', color: 'secondary' },
            { title: 'Tailwind', subtitle: 'Utility CSS', icon: 'style', color: 'primary' },
            { title: 'Next.js', subtitle: 'Fullstack Framework', icon: 'bolt', color: 'tertiary' },
          ],
          expertise: {
            title: 'Services to navigate your Growth',
            description: 'Being an expert at creating customer-centric solutions and making different technologies work together smoothly, think of me as your trusted guide in the digital world. By collaboration, I can help you lead your business to stay ahead in the ever-changing digital landscape.',
            stats: [],
            cards: [
              {
                title: 'Web Application',
                description: 'I can help you create attractive websites using the latest technology to improve user experience and increase your...',
                projectsCountText: 'READ MORE',
                icon: 'globe',
                color: 'primary',
              },
              {
                title: 'Web Services',
                description: 'For Backend services, I mostly use Node.JS or Golang as it is opensource, performance-oriented, and highly...',
                projectsCountText: 'READ MORE',
                icon: 'dns',
                color: 'secondary',
              },
              {
                title: 'Mobile Application',
                description: 'Android, iOS, or PWA or all - you pick a choice, I do it for you. I work with React Native and Flutter that ranks top amon...',
                projectsCountText: 'READ MORE',
                icon: 'smartphone',
                color: 'tertiary',
              },
              {
                title: 'DevOps',
                description: 'For Web, I use Docker, Jenkins, GitHub Actions, and any cloud provider while for Mobile I use Fastlane and Jenkins.',
                projectsCountText: 'READ MORE',
                icon: 'code',
                color: 'primary',
              },
              {
                title: 'Consulting',
                description: 'Any business or technology consulting needs? Talk to me and I will most likely be able to help.',
                projectsCountText: 'READ MORE',
                icon: 'laptop_mac',
                color: 'secondary',
              },
            ],
          },
          workExperience: {
            title: 'Professional Journey',
            timeline: [
              {
                company: 'Global Solution',
                duration: 'FEB 2019 - PRESENT',
                role: 'Sr. Product Designer',
                description: 'Spearheading design initiatives for core product verticals. Focused on building scalable design systems and mentoring junior designers in a fast-paced product-led growth environment.',
                color: 'primary',
              },
            ],
          },
          latestWorks: {
            title: 'Selected Projects',
            subtitle: 'A showcase of recent digital experiences.',
            selectedWorks: [craveable.id, solstice.id, aether.id],
          },
          testimonialsSection: {
            title: 'What Clients Say',
            subtitle: 'Trusted by industry leaders and creative professionals worldwide.',
            testimonialsList: [
              {
                avatar: profileImageId,
                quote: 'Pruthvish delivered exceptional results that significantly improved our user engagement metrics. Highly recommended!',
                name: 'Anamika Sandula',
                role: 'Product Manager',
                color: 'primary',
              },
            ],
          },
          cta: {
            title: "OK. LET'S CREATE SOMETHING GREAT TOGETHER.",
            preEmailText: 'Pruthvish.',
            email: 'pruthvish@example.com',
          },
        },
      ],
    },
  })

  console.log('Seeded Home Page successfully!')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
