import type { Block } from 'payload'

export const PortfolioDetail: Block = {
  slug: 'portfolioDetail',
  interfaceName: 'PortfolioDetailBlock',
  labels: {
    singular: 'Portfolio Detail',
    plural: 'Portfolio Details',
  },
  fields: [
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'portfolios',
      required: true,
      label: 'Project',
      admin: {
        description: 'Select the project to render as a portfolio case study detail page.',
      },
    },
  ],
}
