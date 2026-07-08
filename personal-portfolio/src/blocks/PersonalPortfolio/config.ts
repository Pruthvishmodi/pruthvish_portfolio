import type { Block } from 'payload'

export const PersonalPortfolio: Block = {
  slug: 'personalPortfolio',
  interfaceName: 'PersonalPortfolioBlock',
  dbName: 'pers_port',
  labels: {
    singular: 'Personal Portfolio',
    plural: 'Personal Portfolios',
  },
  fields: [
    // Hero Section Group
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'badgeText',
          type: 'text',
          label: 'Badge Text',
          defaultValue: 'AVAILABLE FOR REMOTE OPPORTUNITIES',
        },
        {
          name: 'titlePreHighlight',
          type: 'text',
          label: 'Title Pre-Highlight',
          defaultValue: 'I’m',
        },
        {
          name: 'titleHighlight',
          type: 'text',
          label: 'Title Highlighted Text',
          defaultValue: 'Pruthvish Modi',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue: 'I\'m Sr.Software Developer and I hold expertise in making digital space more interactive through coding..',
        },
        {
          name: 'experienceYears',
          type: 'text',
          label: 'Experience Years / Stat 1 Number',
          defaultValue: '10+',
        },
        {
          name: 'experienceLabel',
          type: 'text',
          label: 'Experience Label / Stat 1 Label',
          defaultValue: 'YEARS OF EXPERIENCE',
        },
        {
          name: 'certificationTitle',
          type: 'text',
          label: 'Certification Title / Stat 2 Number',
          defaultValue: '15',
        },
        {
          name: 'certificationLabel',
          type: 'text',
          label: 'Certification Label / Stat 2 Label',
          defaultValue: 'COMPLETED PROJECTS',
        },
        {
          name: 'stat3Number',
          type: 'text',
          label: 'Stat 3 Number',
          defaultValue: '50',
        },
        {
          name: 'stat3Label',
          type: 'text',
          label: 'Stat 3 Label',
          defaultValue: 'CORPORATE TRAINING',
        },
        {
          name: 'stat4Number',
          type: 'text',
          label: 'Stat 4 Number',
          defaultValue: '300',
        },
        {
          name: 'stat4Label',
          type: 'text',
          label: 'Stat 4 Label',
          defaultValue: 'HOURS OF ONLINE TRAINING',
        },
        {
          name: 'sayHiLabel',
          type: 'text',
          label: 'Say Hi Button Label',
          defaultValue: 'CONTACT ME',
        },
        {
          name: 'sayHiLink',
          type: 'text',
          label: 'Say Hi Button Link',
          defaultValue: '#contact',
        },
        {
          name: 'downloadCvLabel',
          type: 'text',
          label: 'Download CV Button Label',
          defaultValue: 'Download CV',
        },
        {
          name: 'downloadCvFile',
          type: 'upload',
          relationTo: 'media',
          label: 'Download CV File',
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Profile Image',
          required: true,
        },
        {
          name: 'introduction',
          type: 'text',
          label: 'Introduction Subheading',
          defaultValue: 'Senior Full-Stack Developer & AI-First Engineer',
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
          defaultValue: 'Ahmedabad, Gujarat, India',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email',
          defaultValue: 'your.email@example.com',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone',
          defaultValue: '+91 99999 99999',
        },
        {
          name: 'linkedinLabel',
          type: 'text',
          label: 'LinkedIn Button Label',
          defaultValue: 'LinkedIn',
        },
        {
          name: 'linkedinLink',
          type: 'text',
          label: 'LinkedIn Button Link',
          defaultValue: 'https://linkedin.com/in/username',
        },
      ],
    },
    // Tech Stack — Proficiency Progress Rings (replaces old Marquee Skills)
    {
      name: 'marqueeSkills',
      type: 'array',
      label: 'Tech Stack Skills (Progress Rings)',
      admin: {
        description: 'Shown as circular progress rings below the Core Mastery cards.',
      },
      defaultValue: [
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
      labels: {
        singular: 'Skill',
        plural: 'Skills',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Skill Name',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Material Symbols Icon Name',
          admin: {
            description: 'e.g., code, brush, bolt, style',
          },
        },
        {
          name: 'proficiency',
          type: 'number',
          label: 'Proficiency % (0–100)',
          defaultValue: 90,
          min: 0,
          max: 100,
          admin: {
            description: 'Used to fill the circular progress ring. E.g. 95 = 95%',
          },
        },
      ],
    },
    {
      name: 'skillsTitle',
      type: 'text',
      label: 'Skills Section Title',
      defaultValue: 'My Expertise that provides Value',
    },
    {
      name: 'skillsDescription',
      type: 'textarea',
      label: 'Skills Section Description',
      defaultValue:
        "Having accumulated a wealth of experience spanning over 9+ years in the corporate landscape, I can readily attest to having engaged with a diverse array of technologies. Throughout my journey, I've actively embraced and navigated through numerous technological domains, making me a versatile player in this dynamic field. The proficiencies highlighted in this context accurately reflect the areas where I have honed my expertise, showcasing the depth of my skillset and underscoring my ability to excel in multifaceted roles.",
    },
    // Tech Stack — Core Mastery Cards (top 4 feature cards in the Expertise & Tech Stack section)
    {
      name: 'coreMastery',
      type: 'array',
      label: 'Core Mastery Cards (Tech Stack)',
      admin: {
        description: 'The 4 highlighted tool cards shown at the top of the Expertise & Tech Stack section (e.g. Figma, React, Tailwind, Next.js).',
      },
      defaultValue: [
        { title: 'Figma', subtitle: 'Design System', icon: 'brush', color: 'primary' },
        { title: 'React', subtitle: 'Frontend Dev', icon: 'code', color: 'secondary' },
        { title: 'Tailwind', subtitle: 'Utility CSS', icon: 'style', color: 'primary' },
        { title: 'Next.js', subtitle: 'Fullstack Framework', icon: 'bolt', color: 'tertiary' },
      ],
      labels: {
        singular: 'Core Tool',
        plural: 'Core Tools',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tool Name',
          required: true,
          defaultValue: 'Figma',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Tool Subtitle',
          defaultValue: 'Design System',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Material Symbols Icon',
          defaultValue: 'brush',
          admin: {
            description: 'e.g., brush, code, style, bolt',
          },
        },
        {
          name: 'color',
          type: 'select',
          dbName: 'pp_core_color',
          label: 'Icon Theme Color',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
          ],
        },
      ],
    },
    // Driving Business Growth Section (replaces old "Expertise Section")
    {
      name: 'expertise',
      type: 'group',
      label: 'Driving Business Growth Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Headline',
          defaultValue: 'Services to navigate your Growth',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Section Description',
          defaultValue:
            'Being an expert at creating customer-centric solutions and making different technologies work together smoothly, think of me as your trusted guide in the digital world. By collaboration, I can help you lead your business to stay ahead in the ever-changing digital landscape.',
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Stat Highlights (e.g. 285+ Projects)',
          admin: {
            description: 'Shown as highlighted stat boxes on the right side of the headline.',
          },
          defaultValue: [],
          fields: [
            {
              name: 'number',
              type: 'text',
              label: 'Stat Number (e.g., 285+)',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Stat Label',
              required: true,
            },
            {
              name: 'color',
              type: 'select',
              dbName: 'pp_stat_color',
              label: 'Stat Color',
              defaultValue: 'primary',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Tertiary', value: 'tertiary' },
              ],
            },
          ],
        },
        {
          name: 'cards',
          type: 'array',
          label: 'Service Cards',
          admin: {
            description: 'The service offering cards shown below the headline (e.g. Website Design, Mobile App, Brand Identity).',
          },
          defaultValue: [
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
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Service Title',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Service Description',
              defaultValue: 'High-converting landing pages and enterprise SaaS platforms designed for performance.',
            },
            {
              name: 'projectsCountText',
              type: 'text',
              label: 'Projects Count Text',
              defaultValue: '76 PROJECTS',
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Material Icon Name',
              defaultValue: 'desktop_windows',
            },
            {
              name: 'color',
              type: 'select',
              dbName: 'pp_card_color',
              label: 'Card Theme Color',
              defaultValue: 'primary',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Tertiary', value: 'tertiary' },
              ],
            },
          ],
        },
      ],
    },
    // Work Experience Timeline
    {
      name: 'workExperience',
      type: 'group',
      label: 'Work Experience Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'My Work Experience',
        },
        {
          name: 'timeline',
          type: 'array',
          label: 'Timeline Entries',
          fields: [
            {
              name: 'company',
              type: 'text',
              label: 'Company Name / Location',
              required: true,
            },
            {
              name: 'duration',
              type: 'text',
              label: 'Duration (e.g., Sep 2016 - Aug 2014)',
              required: false,
            },
            {
              name: 'role',
              type: 'text',
              label: 'Role Title',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Role Description',
              required: true,
            },
            {
              name: 'color',
              type: 'select',
              dbName: 'pp_timeline_color',
              label: 'Timeline Dot/Title Color',
              defaultValue: 'primary',
              options: [
                { label: 'Primary (Purple-blue)', value: 'primary' },
                { label: 'Secondary (Teal-blue)', value: 'secondary' },
                { label: 'Tertiary (Orange)', value: 'tertiary' },
              ],
            },
          ],
        },
      ],
    },
    // Latest Works
    {
      name: 'latestWorks',
      type: 'group',
      label: 'Latest Works Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'My Latest Works',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Section Subtitle',
          defaultValue: 'Perfect solution for digital experience',
        },
        {
          name: 'exploreMoreLabel',
          type: 'text',
          label: 'Explore More Link Label',
          defaultValue: 'EXPLORE MORE WORKS',
        },
        {
          name: 'exploreMoreLink',
          type: 'text',
          label: 'Explore More Link Path',
          defaultValue: '/portfolio',
        },
        {
          name: 'selectedWorks',
          type: 'relationship',
          relationTo: 'portfolios',
          hasMany: true,
          label: 'Selected Portfolio Projects',
          required: true,
        },
      ],
    },
    // Testimonials
    {
      name: 'testimonialsSection',
      type: 'group',
      label: 'Testimonials Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'People talk about us',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Section Subtitle',
          defaultValue: 'I got a job that was in accordance with the salary and field of work. The process of submitting an application was quite cozy.',
        },
        {
          name: 'testimonialsList',
          type: 'array',
          dbName: 'pp_testimonials',
          label: 'Testimonials List',
          fields: [
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
              label: 'Client Avatar',
              required: true,
            },
            {
              name: 'quote',
              type: 'textarea',
              label: 'Quote',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              label: 'Client Name',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              label: 'Client Role/Title',
              required: true,
            },
            {
              name: 'color',
              type: 'select',
              dbName: 'pp_testimonial_color',
              label: 'Card Frame/Theme Color',
              defaultValue: 'primary',
              options: [
                { label: 'Primary (Purple-blue)', value: 'primary' },
                { label: 'Secondary (Teal-blue)', value: 'secondary' },
                { label: 'Tertiary (Orange)', value: 'tertiary' },
              ],
            },
            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Featured Card (slightly scaled up)',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    // CTA Section Group
    {
      name: 'cta',
      type: 'group',
      label: 'CTA Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'CTA Title',
          defaultValue: 'Let’s make something amazing together.',
        },
        {
          name: 'preEmailText',
          type: 'text',
          label: 'Pre-Email Text',
          defaultValue: 'Start by saying hi',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email Address',
          defaultValue: 'banjan10@gmail.com',
        },
        {
          name: 'addressTitle',
          type: 'text',
          label: 'Address Section Title',
          defaultValue: 'INFORMATION',
        },
        {
          name: 'address',
          type: 'text',
          label: 'Address Text',
          defaultValue: '145 New York, FL 5467, USA',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Quick Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Link Label',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              label: 'Link URL',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
