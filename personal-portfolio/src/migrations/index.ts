import * as migration_20260707_074413_init from './20260707_074413_init';
import * as migration_20260708_050252_add_linkedin_and_contact_fields from './20260708_050252_add_linkedin_and_contact_fields';

export const migrations = [
  {
    up: migration_20260707_074413_init.up,
    down: migration_20260707_074413_init.down,
    name: '20260707_074413_init',
  },
  {
    up: migration_20260708_050252_add_linkedin_and_contact_fields.up,
    down: migration_20260708_050252_add_linkedin_and_contact_fields.down,
    name: '20260708_050252_add_linkedin_and_contact_fields'
  },
];
