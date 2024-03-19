import {createRealmContext} from '@realm/react';
import {Task} from './Task';
import {Nft} from "./Nft";
import {Collection} from "./Collection";
const config = {
  schema: [Nft, Collection],
 // closeOnUnmount: true,
  // increment the 'schemaVersion', since 'age' has been added to the schema
  schemaVersion: 12,
  deleteRealmIfMigrationNeeded: true // use this for development only to delete the database when a schema mismatch requires a migration
};
export const defaultPathLocalRealm = createRealmContext(config);
