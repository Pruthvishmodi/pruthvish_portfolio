import type { Block } from 'payload'

export const Portfolio: Block = {
  slug: 'portfolio',
  interfaceName: 'PortfolioBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Our Portfolio',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      admin: {
        description: 'Under the main title.',
      },
    },
    {
      name: 'selectedProjects',
      type: 'relationship',
      relationTo: 'portfolios',
      hasMany: true,
      label: 'Manual Portfolios Sequence (All Tab)',
      admin: {
        description: 'Select portfolios and drag/reorder them as pills to set their manual sequence in the "All" tab.',
      },
    },
    {
      name: 'webProjects',
      type: 'array',
      label: 'Web Projects',
      fields: [
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'portfolios',
          required: true,
        },
        {
          name: 'customTitle',
          type: 'text',
          label: 'Custom Title Override',
          admin: {
            description: 'Override the default project title.',
          },
        },
        {
          name: 'customDescription',
          type: 'textarea',
          label: 'Custom Description Override',
          admin: {
            description: 'Override the default project description.',
          },
        },
      ],
    },
    {
      name: 'mobileProjects',
      type: 'array',
      label: 'Mobile Projects',
      fields: [
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'portfolios',
          required: true,
        },
        {
          name: 'customTitle',
          type: 'text',
          label: 'Custom Title Override',
          admin: {
            description: 'Override the default project title.',
          },
        },
        {
          name: 'customDescription',
          type: 'textarea',
          label: 'Custom Description Override',
          admin: {
            description: 'Override the default project description.',
          },
        },
      ],
    },
    {
      name: 'aiVideos',
      type: 'array',
      label: 'AI Videos (YouTube)',
      fields: [
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'portfolios',
          required: true,
        },
        {
          name: 'customTitle',
          type: 'text',
          label: 'Custom Title Override',
          admin: {
            description: 'Override the default project title.',
          },
        },
        {
          name: 'customDescription',
          type: 'textarea',
          label: 'Custom Description Override',
          admin: {
            description: 'Override the default project description.',
          },
        },
      ],
    },
  ],
}
