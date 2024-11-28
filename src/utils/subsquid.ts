import { GraphQLClient } from 'graphql-request'

import { getSdk } from '@generated/graphql'

export const squid = getSdk(new GraphQLClient('https://origin.squids.live/origin-squid/graphql', { fetch: fetch }))
