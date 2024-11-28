import { gql } from 'graphql-request'
import { compact } from 'lodash'

import * as governanceAbi from '@abi/governance'
import * as proxyAbi from '@abi/governed-upgradeability-proxy'
import * as multisigAbi from '@abi/multisig'
import * as timelockAbi from '@abi/timelock'
import { getAddressName } from '@utils/addresses/names'
import { formatAmount } from '@utils/formatAmount'
import { transactionLink } from '@utils/links'
import { squid } from '@utils/subsquid'

import { registerDiscordRenderer } from '..'

gql`
  query getProposalData($proposalId: BigInt!) {
    governanceProposals(limit: 1, where: { proposalId_eq: $proposalId }) {
      proposalId
      proposer
      description
    }
  }
`

export const getExtraProposalFields = async (proposalId: string) => {
  const { governanceProposals } = await squid.getProposalData({ proposalId }).catch(() => ({ governanceProposals: [] }))
  return compact([
    governanceProposals[0]?.proposer && {
      name: 'Proposer',
      value: getAddressName(governanceProposals[0].proposer),
    },
    governanceProposals[0]?.description && {
      name: 'Description',
      value: governanceProposals[0].description,
    },
  ])
}

// Governance ABI Events
registerDiscordRenderer(governanceAbi.events.LateQuorumVoteExtensionSet, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Late Quorum Vote Extension Set`,
    fields: [
      {
        name: 'Old Extension',
        value: params.data.oldVoteExtension.toString(),
      },
      {
        name: 'New Extension',
        value: params.data.newVoteExtension.toString(),
      },
    ],
  }
})
registerDiscordRenderer(governanceAbi.events.ProposalCanceled, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Proposal Canceled`,
    fields: [
      {
        name: 'Proposal ID',
        value: `0x${params.data.proposalId.toString(16)}`,
      },
      ...(await getExtraProposalFields(params.data.proposalId.toString())),
    ],
  }
})
registerDiscordRenderer(governanceAbi.events.ProposalCreated, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Proposal Created`,
    fields: [
      {
        name: 'Proposal ID',
        value: `0x${params.data.proposalId.toString(16)}`,
      },
      {
        name: 'Proposer',
        value: getAddressName(params.data.proposer),
      },
      {
        name: 'Description',
        value: params.data.description,
      },
    ],
  }
})

registerDiscordRenderer(governanceAbi.events.ProposalExecuted, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Proposal Executed`,
    fields: [
      {
        name: 'Proposal ID',
        value: `0x${params.data.proposalId.toString(16)}`,
      },
      ...(await getExtraProposalFields(params.data.proposalId.toString())),
    ],
  }
})
registerDiscordRenderer(governanceAbi.events.ProposalExtended, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Proposal Extended`,
    fields: [
      {
        name: 'Proposal ID',
        value: `0x${params.data.proposalId.toString(16)}`,
      },
      {
        name: 'Extended Deadline',
        value: params.data.extendedDeadline.toString(),
      },
      ...(await getExtraProposalFields(params.data.proposalId.toString())),
    ],
  }
})
registerDiscordRenderer(governanceAbi.events.ProposalQueued, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Proposal Queued`,
    fields: [
      {
        name: 'Proposal ID',
        value: `0x${params.data.proposalId.toString(16)}`,
      },
      {
        name: 'ETA',
        value: params.data.eta.toString(),
      },
      ...(await getExtraProposalFields(params.data.proposalId.toString())),
    ],
  }
})
registerDiscordRenderer(governanceAbi.events.ProposalThresholdSet, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Proposal Threshold Set`,
    fields: [
      {
        name: 'Old Threshold',
        value: params.data.oldProposalThreshold.toString(),
      },
      {
        name: 'New Threshold',
        value: params.data.newProposalThreshold.toString(),
      },
    ],
  }
})
registerDiscordRenderer(governanceAbi.events.QuorumNumeratorUpdated, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Quorum Numerator Updated`,
    fields: [
      {
        name: 'Old Quorum Numerator',
        value: params.data.oldQuorumNumerator.toString(),
      },
      {
        name: 'New Quorum Numerator',
        value: params.data.newQuorumNumerator.toString(),
      },
    ],
  }
})
registerDiscordRenderer(governanceAbi.events.TimelockChange, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Timelock Changed`,
    fields: [
      {
        name: 'Old Timelock',
        value: getAddressName(params.data.oldTimelock),
      },
      {
        name: 'New Timelock',
        value: getAddressName(params.data.newTimelock),
      },
    ],
  }
})
registerDiscordRenderer(governanceAbi.events.VoteCast, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Vote Cast`,
    fields: [
      {
        name: 'Proposal ID',
        value: `0x${params.data.proposalId.toString(16)}`,
      },
      {
        name: 'Voter',
        value: getAddressName(params.data.voter),
      },
      {
        name: 'Support',
        value: params.data.support.toString(),
      },
      {
        name: 'Weight',
        value: formatAmount(params.data.weight),
      },
      {
        name: 'Reason',
        value: params.data.reason,
      },
    ],
  }
})
registerDiscordRenderer(governanceAbi.events.VoteCastWithParams, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Vote Cast With Params`,
    fields: [
      {
        name: 'Proposal ID',
        value: `0x${params.data.proposalId.toString(16)}`,
      },
      {
        name: 'Voter',
        value: getAddressName(params.data.voter),
      },
      {
        name: 'Support',
        value: params.data.support.toString(),
      },
      {
        name: 'Weight',
        value: formatAmount(params.data.weight),
      },
      {
        name: 'Reason',
        value: params.data.reason,
      },
    ],
  }
})
registerDiscordRenderer(governanceAbi.events.VotingDelaySet, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Voting Delay Set`,
    fields: [
      {
        name: 'Old Voting Delay',
        value: params.data.oldVotingDelay.toString(),
      },
      {
        name: 'New Voting Delay',
        value: params.data.newVotingDelay.toString(),
      },
    ],
  }
})
registerDiscordRenderer(governanceAbi.events.VotingPeriodSet, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Voting Period Set`,
    fields: [
      {
        name: 'Old Voting Period',
        value: params.data.oldVotingPeriod.toString(),
      },
      {
        name: 'New Voting Period',
        value: params.data.newVotingPeriod.toString(),
      },
    ],
  }
})

// Multisig ABI Events
registerDiscordRenderer(multisigAbi.events.AddedOwner, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Added Owner`,
    fields: [
      {
        name: 'Owner',
        value: getAddressName(params.data.owner),
      },
    ],
  }
})
registerDiscordRenderer(multisigAbi.events.RemovedOwner, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Removed Owner`,
    fields: [
      {
        name: 'Owner',
        value: getAddressName(params.data.owner),
      },
    ],
  }
})
registerDiscordRenderer(multisigAbi.events.ApproveHash, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Approved Hash`,
    fields: [
      {
        name: 'Hash',
        value: params.data.approvedHash,
      },
      {
        name: 'Owner',
        value: getAddressName(params.data.owner),
      },
    ],
  }
})
registerDiscordRenderer(multisigAbi.events.ChangedFallbackHandler, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Changed Fallback Handler`,
    fields: [
      {
        name: 'Handler',
        value: getAddressName(params.data.handler),
      },
    ],
  }
})
registerDiscordRenderer(multisigAbi.events.ChangedGuard, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Changed Guard`,
    fields: [
      {
        name: 'Guard',
        value: getAddressName(params.data.guard),
      },
    ],
  }
})
registerDiscordRenderer(multisigAbi.events.ChangedThreshold, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Changed Threshold`,
    fields: [
      {
        name: 'Threshold',
        value: params.data.threshold.toString(),
      },
    ],
  }
})
registerDiscordRenderer(multisigAbi.events.DisabledModule, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Disabled Module`,
    fields: [
      {
        name: 'Module',
        value: params.data.module,
      },
    ],
  }
})
registerDiscordRenderer(multisigAbi.events.EnabledModule, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Enabled Module`,
    fields: [
      {
        name: 'Module',
        value: params.data.module,
      },
    ],
  }
})
registerDiscordRenderer(multisigAbi.events.ExecutionFailure, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Execution Failure`,
    fields: compact([
      params.data.payment > 0 && {
        name: 'Payment',
        value: formatAmount(params.data.payment),
      },
    ]),
  }
})
registerDiscordRenderer(multisigAbi.events.ExecutionFromModuleFailure, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Execution From Module Failure`,
    fields: [
      {
        name: 'Module',
        value: params.data.module,
      },
    ],
  }
})
registerDiscordRenderer(multisigAbi.events.ExecutionFromModuleSuccess, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Execution From Module Success`,
    fields: [
      {
        name: 'Module',
        value: params.data.module,
      },
    ],
  }
})
registerDiscordRenderer(multisigAbi.events.ExecutionSuccess, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Execution Success`,
    fields: compact([
      params.data.payment > 0 && {
        name: 'Payment',
        value: formatAmount(params.data.payment),
      },
    ]),
  }
})
registerDiscordRenderer(multisigAbi.events.SafeModuleTransaction, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Safe Module Transaction`,
    fields: [
      {
        name: 'Module',
        value: params.data.module,
      },
      {
        name: 'Operation',
        value: params.data.operation.toString(),
      },
      {
        name: 'To',
        value: getAddressName(params.data.to),
      },
    ],
  }
})
registerDiscordRenderer(multisigAbi.events.SafeMultiSigTransaction, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Safe MultiSig Transaction`,
    fields: compact([
      {
        name: 'To',
        value: getAddressName(params.data.to),
      },
      {
        name: 'Signature Count',
        value: params.data.signatures.length.toString(),
      },
      params.data.additionalInfo.length > 0 && {
        name: 'Additional Info',
        value: params.data.additionalInfo,
      },
    ]),
  }
})
registerDiscordRenderer(multisigAbi.events.SafeReceived, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Safe Received`,
    fields: compact([
      {
        name: 'From',
        value: getAddressName(params.data.sender),
      },
      {
        name: 'Value',
        value: formatAmount(params.data.value),
      },
    ]),
  }
})
registerDiscordRenderer(multisigAbi.events.SafeSetup, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Safe Setup`,
    fields: compact([
      {
        name: 'Initializer',
        value: getAddressName(params.data.initializer),
      },
      {
        name: 'Initiator',
        value: getAddressName(params.data.initiator),
      },
      {
        name: 'Threshold',
        value: params.data.threshold.toString(),
      },
      {
        name: 'Fallback Handler',
        value: getAddressName(params.data.fallbackHandler),
      },
      ...params.data.owners.map((owner, index) => ({
        name: `Owner ${index + 1}`,
        value: getAddressName(owner),
      })),
    ]),
  }
})
registerDiscordRenderer(multisigAbi.events.SignMsg, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Sign Message`,
    fields: [
      {
        name: 'Message Hash',
        value: params.data.msgHash,
      },
    ],
  }
})

// Timelock Base ABI Events
registerDiscordRenderer(timelockAbi.events.CallExecuted, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Call Executed`,
    fields: [
      {
        name: 'Target',
        value: getAddressName(params.data.target),
      },
    ],
  }
})
registerDiscordRenderer(timelockAbi.events.CallScheduled, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Call Scheduled`,
    fields: [
      {
        name: 'Target',
        value: getAddressName(params.data.target),
      },
      {
        name: 'Delay',
        value: params.data.delay.toString(),
      },
    ],
  }
})
registerDiscordRenderer(timelockAbi.events.Cancelled, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Call Cancelled`,
    fields: [
      {
        name: 'Id',
        value: params.data.id,
      },
    ],
  }
})
registerDiscordRenderer(timelockAbi.events.MinDelayChange, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Minimum Delay Change`,
    fields: [
      {
        name: 'Old Minimum',
        value: params.data.oldDuration.toString(),
      },
      {
        name: 'New Minimum',
        value: params.data.newDuration.toString(),
      },
    ],
  }
})
registerDiscordRenderer(timelockAbi.events.RoleAdminChanged, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Role Admin Changed`,
    fields: [
      {
        name: 'Role',
        value: params.data.role,
      },
      {
        name: 'Previous Admin',
        value: getAddressName(params.data.previousAdminRole),
      },
      {
        name: 'New Admin',
        value: getAddressName(params.data.newAdminRole),
      },
    ],
  }
})
registerDiscordRenderer(timelockAbi.events.RoleGranted, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Role Granted`,
    fields: [
      {
        name: 'Role',
        value: params.data.role,
      },
      {
        name: 'Account',
        value: getAddressName(params.data.account),
      },
      {
        name: 'Sender',
        value: getAddressName(params.data.sender),
      },
    ],
  }
})
registerDiscordRenderer(timelockAbi.events.RoleRevoked, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Role Revoked`,
    fields: [
      {
        name: 'Role',
        value: params.data.role,
      },
      {
        name: 'Account',
        value: getAddressName(params.data.account),
      },
      {
        name: 'Sender',
        value: getAddressName(params.data.sender),
      },
    ],
  }
})

// Proxy ABI Events
registerDiscordRenderer(proxyAbi.events.GovernorshipTransferred, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Governorship Transferred`,
    titleUrl: transactionLink(params.log.transactionHash, params.ctx.chain),
    fields: [
      {
        name: 'Previous Governor',
        value: getAddressName(params.data.previousGovernor),
      },
      {
        name: 'New Governor',
        value: getAddressName(params.data.newGovernor),
      },
    ],
  }
})

registerDiscordRenderer(proxyAbi.events.PendingGovernorshipTransfer, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Pending Governorship Transfer`,
    titleUrl: transactionLink(params.log.transactionHash, params.ctx.chain),
    fields: [
      {
        name: 'Previous Governor',
        value: getAddressName(params.data.previousGovernor),
      },
      {
        name: 'New Governor',
        value: getAddressName(params.data.newGovernor),
      },
    ],
  }
})

registerDiscordRenderer(proxyAbi.events.Upgraded, async (params) => {
  return {
    title: `${getAddressName(params.log.address)} - Upgraded`,
    titleUrl: transactionLink(params.log.transactionHash, params.ctx.chain),
    fields: [
      {
        name: 'New Implementation',
        value: getAddressName(params.data.implementation) ?? params.data.implementation,
        inline: true,
      },
    ],
  }
})
