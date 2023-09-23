import {createRealmContext} from '@realm/react';
import {Foliar} from './src/schemas/foliar.schema';
import {Fertilizer} from './src/schemas/fertilizer.schema';

export const realmContext = createRealmContext({
  schema: [Foliar, Fertilizer],
});
