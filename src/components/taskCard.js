import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  Card,
  Avatar,
  IconButton,
  Dialog,
  Portal,
  PaperProvider,
} from 'react-native-paper';
import {
  SafeAreaSafe,
  SafeAreaViewAreaView,
} from 'react-native-safe-area-context';

import {realmContext} from '../../RealmContext';
import {Task} from '../schemas/task.schema';
import {useGlobal} from '../contexts/GlobalContext';
import {User} from '../schemas/user.schema';

const TaskCard = ({taskObject, showSnackBar}) => {
  const taskTitle = taskObject['title'];
  const taskCompleted = taskObject['completed'];
  const taskDate = taskObject['date'];
  const taskAssignee = taskObject.assigneeName['eng'];

  const {useQuery} = realmContext;
  const {userId, userName, userData} = useGlobal();
  const users = useQuery(User);

  const assigneeUser = users.find(user => user._id == taskObject.assigneeId);

  // const getTaskTypeStyle = taskType => {
  //   switch (taskType) {
  //     case 'Urgent':
  //       return styles.urgent;
  //     case 'Important':
  //       return styles.important;
  //     case 'Normal':
  //       return styles.normal;
  //     default:
  //       return styles.default; // Default style if taskType doesn't match any
  //   }
  // };

  // const taskTypeStyle = getTaskTypeStyle(props.taskType);

  const {useRealm} = realmContext;
  const realm = useRealm();

  const [dialogVisible, setDialogVisible] = useState(false);
  const [disableCompleteButton, setDisableCompleteButton] = useState(false);

  const showConfirmDialog = () => setDialogVisible(true);
  const hideConfirmDialog = () => setDialogVisible(false);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Task));
    });

    if (
      userData['role'] == 'owner' &&
      assigneeUser['role'] == 'owner' &&
      userId.toString() !== assigneeUser['_id'].toString()
    ) {
      setDisableCompleteButton(true);
    }
  }, [realm]);

  const handleMarkTaskAsCompleted = () => {
    realm.write(() => {
      taskObject.completed = true;
      realm.create('notifications', {
        userId: taskObject.creatorId,
        userName: taskObject.creatorName,
        farmId: taskObject.farmId,
        farmName: taskObject.farmName,
        assigneeId: taskObject.assigneeId,
        assigneeName: taskObject.assigneeName,
        markedId: userId.toString(),
        markedName: {eng: userName, chs: '', cht: ''},
        content: taskObject.title,
        date: new Date(taskObject['date'].toISOString()),
        createdAt: new Date(new Date().toISOString()),
        readUsers: [],
        category: 'completed',
      });
    });
    hideConfirmDialog();
    showSnackBar();
  };

  const getTaskStatus = taskCompleted => {
    switch (taskCompleted) {
      case false:
        return 'checkbox-blank-circle';
      case true:
        return 'check-bold';
      default:
        return 'checkbox-blank-circle';
    }
  };

  const taskStatusIcon = getTaskStatus(taskCompleted);

  const getTaskStatusColor = taskStatus => {
    switch (taskStatus) {
      case false:
        return styles.inProgress;
      case true:
        return styles.completed;
    }
  };

  const taskStatusBgColor = getTaskStatusColor(taskCompleted);

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.statusIndicator}>
        <Avatar.Icon
          size={22}
          icon={taskStatusIcon}
          style={taskStatusBgColor}
          color="#ffffff"
        />
        <SafeAreaView style={styles.dottedLine}>
          <SafeAreaView style={styles.dot} />
          <SafeAreaView style={styles.dot} />
          <SafeAreaView style={styles.dot} />
          <SafeAreaView style={styles.dot} />
          <SafeAreaView style={styles.dot} />
        </SafeAreaView>
      </SafeAreaView>
      <Card style={styles.taskCard}>
        <Card.Content>
          <Text style={styles.taskTitle}>{taskTitle}</Text>
          {/* <SafeAreaView style={[styles.taskType, taskTypeStyle]}>
            <Text style={styles.taskTypeText}>{props.taskType}</Text>
          </SafeAreaView> */}
          <SafeAreaView>
            {taskDate && (
              <Text style={styles.taskDate}>
                {taskDate.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </Text>
            )}
          </SafeAreaView>
          <SafeAreaView>
            {taskAssignee && (
              <Text style={styles.taskDate}>Assigned to {taskAssignee}</Text>
            )}
          </SafeAreaView>
        </Card.Content>
        <Card.Actions>
          <IconButton
            icon="checkbox-marked-circle-outline"
            mode="contained"
            size={19}
            style={styles.completeButton}
            iconColor="white"
            disabled={taskCompleted || disableCompleteButton}
            onPress={showConfirmDialog}></IconButton>
        </Card.Actions>
      </Card>
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={hideConfirmDialog}
          style={styles.confirmDialog}>
          <Dialog.Icon icon="alert-circle" size={30} />
          <Dialog.Title style={styles.dialogTitle}>
            Confirm Task is Completed
          </Dialog.Title>
          <Dialog.Content>
            <SafeAreaView style={styles.dialogContainer}>
              <Text variant="bodyMedium">
                Do you confirm to mark the task as completed?
              </Text>
            </SafeAreaView>
          </Dialog.Content>
          <Dialog.Actions>
            <SafeAreaView style={styles.buttonRow}>
              <Button textColor="#C23E3B" onPress={hideConfirmDialog}>
                Cancel
              </Button>
              <Button textColor="#62A87C" onPress={handleMarkTaskAsCompleted}>
                Confirm
              </Button>
            </SafeAreaView>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCard: {
    width: '80%',
    alignSelf: 'flex-end',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDate: {
    marginTop: 5,
    fontSize: 12,
    color: '#7b7b7b',
  },
  taskType: {
    marginTop: 5,
    alignSelf: 'flex-end',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  urgent: {
    backgroundColor: '#ff0000',
  },
  important: {
    backgroundColor: '#ff9900',
  },
  normal: {
    backgroundColor: '#00cc00',
  },
  default: {
    backgroundColor: 'gray', // Default color for an unknown taskType
  },
  taskTypeText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 10,
  },
  statusIndicator: {
    flexDirection: 'column', // Ensures vertical alignment
    alignItems: 'center', // Centers the bars horizontally
    marginRight: 20,
  },
  dottedLine: {
    width: 1,
    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
  },
  dot: {
    width: 1,
    height: 5,
    backgroundColor: '#c6c6c6',
    borderRadius: 2,
    marginVertical: 2,
  },
  inProgress: {
    backgroundColor: '#ADD8E6',
  },
  completed: {
    backgroundColor: '#90EE90',
  },
  completeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#4B7695',
    width: 30,
    height: 30,
  },
  confirmDialog: {
    backgroundColor: 'white',
  },
  dialogTitle: {
    fontSize: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default TaskCard;
