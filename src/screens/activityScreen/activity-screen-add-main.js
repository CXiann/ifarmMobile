import React from 'react';

import ActivityScreenAddForm from './activity-screen-add-form';
import ActivityScreenAddOptions from './activity-screen-add-options';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const ActivityScreenAddMain = () => {
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

export default ActivityScreenAddMain;
