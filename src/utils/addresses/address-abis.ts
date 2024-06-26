import * as otokenAbi from '../../abi/otoken'
import * as otokenBuybackAbi from '../../abi/otoken-buyback'
import * as otokenDripperAbi from '../../abi/otoken-dripper'
import * as otokenHarvesterAbi from '../../abi/otoken-harvester'
import * as otokenVaultAbi from '../../abi/otoken-vault'
import {
  OETH_ADDRESS,
  OETH_BUYBACK,
  OETH_DRIPPER_ADDRESS,
  OETH_HARVESTER_ADDRESS,
  OETH_VAULT_ADDRESS,
  OUSD_ADDRESS,
  OUSD_BUYBACK,
  OUSD_DRIPPER_ADDRESS,
  OUSD_HARVESTER_ADDRESS,
  OUSD_VAULT_ADDRESS,
} from './addresses'

export const oethABIs: Record<string, any> = {
  [OETH_ADDRESS]: otokenAbi,
  [OETH_VAULT_ADDRESS]: otokenVaultAbi,
  [OETH_HARVESTER_ADDRESS]: otokenHarvesterAbi,
  [OETH_DRIPPER_ADDRESS]: otokenDripperAbi,
  [OETH_BUYBACK]: otokenBuybackAbi,
}

export const ousdABIs: Record<string, any> = {
  [OUSD_ADDRESS]: otokenAbi,
  [OUSD_VAULT_ADDRESS]: otokenVaultAbi,
  [OUSD_HARVESTER_ADDRESS]: otokenHarvesterAbi,
  [OUSD_DRIPPER_ADDRESS]: otokenDripperAbi,
  [OUSD_BUYBACK]: otokenBuybackAbi,
}

export const addressABIs: Record<string, unknown> = {
  ...oethABIs,
  ...ousdABIs,
}
