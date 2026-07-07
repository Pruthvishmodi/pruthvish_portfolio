import * as migration_20260707_074413_init from './20260707_074413_init';

export const migrations = [
  {
    up: migration_20260707_074413_init.up,
    down: migration_20260707_074413_init.down,
    name: '20260707_074413_init',
  },
];
