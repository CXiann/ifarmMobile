import {createRealmContext} from '@realm/react';
import {Foliar, Foliar_Name} from './src/schemas/foliar.schema';
import {Fertilizer, Fertilizer_Name} from './src/schemas/fertilizer.schema';
import {Plant, Plant_Name} from './src/schemas/plants.schema';
import {Pesticide, Pesticide_Name} from './src/schemas/pesticide.schema';
import {User_Name, User} from './src/schemas/user.schema';
import {
  Activity_FarmName,
  Activity_Item,
  Activity_UserName,
  Activity,
} from './src/schemas/activity.schema';
import {
  Farm,
  Farm_Address,
  Farm_Name,
  Farm_Fertilizers,
  Farm_Fertilizers_Name,
  Farm_Foliars,
  Farm_Foliars_Name,
  Farm_Pesticides,
  Farm_Pesticides_Name,
  Farm_Plants,
  Farm_Plants_Name,
} from './src/schemas/farm.schema';

export const realmContext = createRealmContext({
  schema: [
    Foliar,
    Foliar_Name,
    Fertilizer,
    Fertilizer_Name,
    Plant,
    Plant_Name,
    Pesticide,
    Pesticide_Name,
    User_Name,
    User,
    Activity_FarmName,
    Activity_Item,
    Activity_UserName,
    Activity,
    Farm,
    Farm_Address,
    Farm_Name,
    Farm_Fertilizers,
    Farm_Fertilizers_Name,
    Farm_Foliars,
    Farm_Foliars_Name,
    Farm_Pesticides,
    Farm_Pesticides_Name,
    Farm_Plants,
    Farm_Plants_Name,
  ],
});
