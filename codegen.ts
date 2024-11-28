import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://origin.squids.live/origin-squid/graphql',
  documents: ['src/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        documentMode: 'documentNode',
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
        },
      },
    },
  },
}

export default config
