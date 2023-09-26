import {createRealmContext} from '@realm/react';
import {Foliar} from './src/schemas/foliar.schema';
import {Fertilizer} from './src/schemas/fertilizer.schema';
import {User_Name, User} from './src/schemas/user.schema';
import {
  Activity_FarmName,
  Activity_Item,
  Activity_UserName,
  Activity,
} from './src/schemas/activity.schema';

export const realmContext = createRealmContext({
  schema: [
    Foliar,
    Fertilizer,
    User_Name,
    User,
    Activity_FarmName,
    Activity_Item,
    Activity_UserName,
    Activity,
  ],
});
