import { createCurveAragonVotingProcessor } from 'templates/curve-aragon-voting'

import { CURVE_ARAGON_51, CURVE_ARAGON_60 } from '@utils/addresses/ousd-analytics'

// Curve Aragon Voting Processors
createCurveAragonVotingProcessor({
  name: 'Curve Aragon Voting (51%)',
  chainId: 1,
  address: [CURVE_ARAGON_51],
  topic: 'OETH',
})

createCurveAragonVotingProcessor({
  name: 'Curve Aragon Voting (60%)',
  chainId: 1,
  address: [CURVE_ARAGON_60],
  topic: 'OETH',
})
