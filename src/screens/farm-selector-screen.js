import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {
  Text,
  Button,
  Card,
  useTheme,
  TextInput,
  IconButton,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import AutocompleteFarmInput from '../components/autocompleteFarmInput';
import Realm, {BSON} from 'realm';
import {realmContext} from '../../RealmContext';
import {useGlobal} from '../contexts/GlobalContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import {Farm} from '../schemas/farm.schema';

const FarmSelectorScreen = ({navigation}) => {
  const {useQuery, useRealm} = realmContext;
  const {userData, setFarmId, setIsLoading, setFarmName} = useGlobal();
  const realm = useRealm();
  const {colors} = useTheme();
  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState('');

  const farms = useQuery(Farm);
  // const [selectedFarm, setSelectedFarm] = useState({id: '', title: ''}); //store farm information in {id:objectId(string), title:}

  useEffect(() => {
    setIsLoading(false);
    // navigation.addListener('beforeRemove', e => {
    //   e.preventDefault();
    // });
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Farm));
    });
    console.log('Total farms: ', farms.length);
  }, [realm, navigation]);

  const currentUserAllFarmBSONId = userData?.farms?.map(
    farmIdStr => new BSON.ObjectId(farmIdStr),
  );
  const allFarmData = farms.filtered('_id IN $0', currentUserAllFarmBSONId);

  useEffect(() => {
    const filterData = () => {
      const filtered = allFarmData.filtered(
        'name.eng CONTAINS[c] $0',
        searchText,
        // return item.name.eng.toString().toLowerCase().includes(lowerCaseQuery);
      );
      setSearchResult(filtered);
    };
    filterData();
  }, [searchText]);

  console.log('User All farms: ', allFarmData?.length);
  // console.log('Selected farm: ', selectedFarm);

  const handleManageButton = farm => {
    // console.log('Before navigating: ', Object.values(farm));
    setFarmId(farm._id);
    setFarmName(farm.name.eng);
    setSearchText('');
    if (farm.name.eng) {
      navigation.navigate('Tabs', {farmName: farm.name.eng});
    } else {
      console.log('No farm selected');
    }
  };

  const style = StyleSheet.create({
    container: {
      flex: 1,
      // padding: 16,
      // paddingBottom: 40,
      justifyContent: 'center',
    },
    headerContainer: {
      // flex: 1,
      padding: 16,
    },
  });

  return (
    <SafeAreaView style={style.container}>
      <SafeAreaView style={style.headerContainer}>
        <Text
          variant="bodyLarge"
          style={{fontWeight: 'bold', marginTop: 10, marginLeft: 5}}>
          Select the farm to manage
        </Text>
        <TextInput
          mode="flat"
          label="Search Farm"
          style={{marginBottom: 10, backgroundColor: 'transparent'}}
          right={<TextInput.Icon icon="magnify" />}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </SafeAreaView>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#adf7ad',
          padding: 15,
          borderRadius: 30,
          elevation: 5,
        }}>
        <FlatList
          data={searchResult}
          keyExtractor={item => item._id.toString()} // Replace 'id' with the unique identifier in your data
          renderItem={({item}) => (
            <Card style={{margin: 5, padding: 5, marginBottom: 10}}>
              {/* <Card.Title title={item.name.eng} subtitle="Card Subtitle" /> */}
              <Card.Content>
                <Text
                  variant="titleLarge"
                  style={{marginBottom: 15, fontWeight: 'bold'}}>
                  {item.name.eng}
                </Text>
                <SafeAreaView style={{flexDirection: 'row', marginBottom: 5}}>
                  <Icon name="location-on" color="blue" size={20} />
                  <Text
                    variant="bodyMedium"
                    style={{marginLeft: 5, color: 'gray'}}>
                    {item.address.eng}
                  </Text>
                </SafeAreaView>
                <SafeAreaView style={{flexDirection: 'row'}}>
                  <Icon2 name="tag" color="red" size={20} />
                  <Text
                    variant="bodyMedium"
                    style={{marginLeft: 5, color: 'gray'}}>
                    {item.tags.join(', ')}
                  </Text>
                </SafeAreaView>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained-tonal"
                  style={{backgroundColor: colors.secondaryContainer}}
                  onPress={() => handleManageButton(item)}>
                  Manage
                </Button>
              </Card.Actions>
            </Card>
          )}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default FarmSelectorScreen;
