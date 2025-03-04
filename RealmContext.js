import {createRealmContext} from '@realm/react';
import {Foliar, Foliar_Name} from './src/schemas/foliar.schema';
import {Fertilizer, Fertilizer_Name} from './src/schemas/fertilizer.schema';
import {Plant, Plant_Name} from './src/schemas/plants.schema';
import {Pesticide, Pesticide_Name} from './src/schemas/pesticide.schema';
import {Fungicide, Fungicide_Name} from './src/schemas/fungicide.schema';
import {User_Name, User} from './src/schemas/user.schema';
import {
  Notification,
  Notification_FarmName,
  Notification_UserName,
  Notification_AssigneeName,
  Notification_MarkedName,
} from './src/schemas/notification.schema';
import {
  Task_FarmName,
  Creator_Name,
  Assignee_Name,
  Task,
} from './src/schemas/task.schema';
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
  Farm_Fungicides,
  Farm_Fungicides_Name,
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
    Fungicide,
    Fungicide_Name,
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
    Farm_Fungicides,
    Farm_Fungicides_Name,
    Farm_Pesticides,
    Farm_Pesticides_Name,
    Farm_Plants,
    Farm_Plants_Name,
    Task_FarmName,
    Creator_Name,
    Assignee_Name,
    Task,
    Notification,
    Notification_FarmName,
    Notification_UserName,
    Notification_AssigneeName,
    Notification_MarkedName,
  ],
});
