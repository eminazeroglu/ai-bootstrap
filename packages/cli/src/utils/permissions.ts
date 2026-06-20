// Permission gating — explicit OK from user before risky actions

import { confirm } from '@inquirer/prompts';
import chalk from 'chalk';

export interface PermissionRequest {
  action: string;
  description: string;
  scope?: string;
  reversible: boolean;
}

/**
 * Ask user for explicit permission before proceeding with a sensitive action.
 * User can decline and we adapt the flow.
 */
export async function askPermission(req: PermissionRequest): Promise<boolean> {
  console.log('');
  console.log(chalk.yellow(`⚠️  İcazə tələbi: ${req.action}`));
  console.log(chalk.dim(`   ${req.description}`));
  if (req.scope) {
    console.log(chalk.dim(`   Əhatə: ${req.scope}`));
  }
  console.log(chalk.dim(`   Geri qaytarıla bilər: ${req.reversible ? 'bəli' : 'XEYR'}`));
  console.log('');

  return await confirm({
    message: 'Davam edək?',
    default: false,
  });
}

/**
 * Batch permission request: ask once for multiple actions in a group.
 */
export async function askBatchPermission(
  groupName: string,
  actions: string[],
): Promise<boolean> {
  console.log('');
  console.log(chalk.yellow(`⚠️  ${groupName} üçün icazə lazımdır:`));
  for (const action of actions) {
    console.log(chalk.dim(`   - ${action}`));
  }
  console.log('');

  return await confirm({
    message: 'Hamısına icazə verirsən?',
    default: false,
  });
}
