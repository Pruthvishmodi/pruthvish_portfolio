import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Portfolios } from './collections/Portfolios'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Portfolios],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    push: false,
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      ssl: process.env.DATABASE_URL?.includes('127.0.0.1') || process.env.DATABASE_URL?.includes('localhost')
        ? false
        : {
          rejectUnauthorized: false,
        },
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      uploadsCollection: 'media',
    }),
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.SUPABASE_S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.SUPABASE_S3_REGION || 'us-east-1',
        endpoint: process.env.SUPABASE_S3_ENDPOINT || 'https://iiklsdxhtwjchqkojgkn.storage.supabase.co/storage/v1/s3',
      },
      enabled: !!process.env.SUPABASE_S3_ACCESS_KEY_ID,
    }),
  ],
  async onInit(payload) {
    try {
      const pages = await payload.find({
        collection: 'pages',
        limit: 1,
      })
      if (pages.totalDocs === 0) {
        console.log('No pages found in database. Running automatic seeding...')
        const { seedDatabase } = await import('./utilities/seedDatabase')
        await seedDatabase(payload)
        console.log('Automatic seeding finished successfully!')
      } else {
        console.log('Database already has pages. Skipping seeding.')
      }
    } catch (error) {
      console.error('Error during automatic database seed check:', error)
    }
  },
})
