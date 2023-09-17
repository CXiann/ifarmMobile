import {createRealmContext} from '@realm/react';
import {Foliars} from './schemas/foliars.schema';

export const realmContext = createRealmContext({
  schema: [Foliars],
});
