import React from 'react';

import ActivityScreenAddForm from '../screens/activityScreen/activity-screen-add-form';
import ActivityScreenAddOptions from '../screens/activityScreen/activity-screen-add-options';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const ActivityScreenAddNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add_Options"
        component={ActivityScreenAddOptions}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ActivityScreenAddNav;
