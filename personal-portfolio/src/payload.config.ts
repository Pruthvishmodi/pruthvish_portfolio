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
          // Serve files directly from Supabase CDN; bypasses Vercel's 4.5 MB proxy limit.
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            // Guard against null filenames (e.g. for some image size variants)
            if (!filename) return ''
            const bucket = process.env.S3_BUCKET || 'pruthvish_portfolio'
            const endpoint = process.env.S3_ENDPOINT || 'https://iiklsdxhtwjchqkojgkn.storage.supabase.co/storage/v1/s3'
            // Derive the public Supabase CDN base from the S3 endpoint.
            // S3 endpoint format: https://<ref>.storage.supabase.co/storage/v1/s3
            // Public object URL format: https://<ref>.storage.supabase.co/storage/v1/object/public/<bucket>/<prefix>/<filename>
            const baseUrl = endpoint.replace(/\/s3$/, '')
            const filePath = prefix ? `${prefix}/${filename}` : filename
            return `${baseUrl}/object/public/${bucket}/${filePath}`
          },
        },
      },
      bucket: process.env.S3_BUCKET || 'pruthvish_portfolio',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
        region: process.env.S3_REGION || 'us-east-1',
        endpoint: process.env.S3_ENDPOINT || 'https://iiklsdxhtwjchqkojgkn.storage.supabase.co/storage/v1/s3',
      },
      // S3 is always enabled — the env vars have hardcoded defaults above.
      // Set to false to fall back to local storage during dev without credentials.
      enabled: !!(process.env.S3_ACCESS_KEY || process.env.SUPABASE_S3_ACCESS_KEY_ID),
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
