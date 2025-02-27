import path from 'path';
import { logger } from '@storybook/node-logger';
import dedent from 'ts-dedent';

import { getInterpretedFile } from './interpret-files';

const toArray = (a) => (a ? [a] : a);

export function loadManagerOrAddonsFile({ configDir }) {
  const storybookCustomAddonsPath = getInterpretedFile(path.resolve(configDir, 'addons'));
  const storybookCustomManagerPath = getInterpretedFile(path.resolve(configDir, 'manager'));

  if (storybookCustomAddonsPath || storybookCustomManagerPath) {
    logger.info('=> Loading custom manager config');
  }

  if (storybookCustomAddonsPath && storybookCustomManagerPath) {
    throw new Error(dedent`
      You have both a "addons.js" and a "manager.js", remove the "addons.js" file from your configDir (${path.resolve(
        configDir,
        'addons'
      )})`);
  }

  return storybookCustomManagerPath || storybookCustomAddonsPath;
}
