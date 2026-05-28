import * as migration_20260526_102131_initial from './20260526_102131_initial';

export const migrations = [
  {
    up: migration_20260526_102131_initial.up,
    down: migration_20260526_102131_initial.down,
    name: '20260526_102131_initial'
  },
];
