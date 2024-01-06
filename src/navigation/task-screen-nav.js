import React from 'react';
import TaskScreenMain from '../screens/taskScreen/task-screen-main';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const TaskScreenNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add_Options"
        component={TaskScreenMain}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default TaskScreenNav;
