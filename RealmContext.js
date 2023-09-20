import {createRealmContext} from '@realm/react';
import {Foliar} from './schemas/foliar.schema';

export const realmContext = createRealmContext({
  schema: [Foliar],
});
