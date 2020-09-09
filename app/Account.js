import React from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Dimensions,
  View,
  TextInput,
  Picker,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, Divider,   ThemeProvider} from 'react-native-elements';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {connect} from 'react-redux';
import Axios from 'axios';
import {colors, globalStyles, settings} from './configs/index';
import {apis} from './configs/index';
import {ActionCreators} from './redux/ActionCreators';
import {ActionCart} from './redux/ActionCart';


const mapStateToProps = state => ({
  user_login: state.user_login,
  cart: state.cart,
});
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		  user_info: this.props.user_login,
		  username: '',
		  address: '',
		  phone: '',
		  name: '',
		  password: '',
		  email: '',
		  district: '',
		  expandedOne: true,
		  citys: [],
		  guild: '',
		  city: '',
		  pay: '',
		  districts: [],
		  guilds: [],
		  mgBot: 0,
    };

    
  }
  _logout = () => {
    this.props.dispatch(ActionCreators.set_user_login(null));
    this.props.navigation.navigate('Home');
  };
  _save = () => {
    const {
      username,
      password,
      name,
      email,
      address,
      phone,
      city,
      district,
    } = this.state;

    if (password == '' || password == null) {
      Alert.alert('Thông báo', 'Bạn chưa nhập mật khẩu');
      return;
    }
    if (phone == '' || phone == null) {
      Alert.alert('Thông báo', 'Bạn chưa nhập số điện thoại');
      return;
    }
    if (email == '' || email == null) {
      Alert.alert('Thông báo', 'Bạn chưa nhập email');
      return;
    }
    if (username == '' || username == null) {
      Alert.alert('Thông báo', 'Bạn chưa nhập tài khoản');
      return;
    }

    apis
      .register(name, username, phone, password, email, address)
      .then(res => {
        if (res.data.statusCode == 201) {
          let user = {
            fullName: name,
            telephone: phone,
            address: address,
            password: password,
            email: email,
            username: username,
            city: city,
            district: district,
            token: res.data.token,
            customerId: res.data.customerId,
          };

          Axios.defaults.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: res.data.token,
          };
          Alert.alert('Thông báo', 'Bạn đã tạo tài khoản thành công');
          this.props.dispatch(ActionCreators.set_user_login(user));

          this.props.navigation.navigate('Home');
        } else {
          Alert.alert(
            'Thông báo',
            'Đã tồn tại tài khoản hoặc số điện thoại, email',
          );
        }
      })
      .catch(err => {
        Alert.alert(
          'Thông báo',
          'Đã tồn tại tài khoản hoặc số điện thoại, email',
        );
      });
  };

  render() {
    const {username, password, name, email, address, phone} = this.state;
    return (
      <View>
        {this.state.user_info ? (
          <View>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="dark-content"
            />
            <View>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{backgroundColor: '#e9edf2'}}>
                <View style={styles.sectionavatar}>
                  <Image
                    style={styles.avatar}
                    source={require('./images/avatar.png')}
                  />
                </View>

                <View style={styles.sectioninfo}>
                  <Text style={styles.infotext}>
                    {this.state.user_info.fullName}
                  </Text>
                  <Text style={styles.infotext}>
                    {this.state.user_info.telephone}
                  </Text>
                  <Text style={styles.infotext}>
                    {this.state.user_info.username}
                  </Text>
                  <Text style={styles.infotext}>
                    {this.state.user_info.email}
                  </Text>
                  <Text style={styles.infotext}>
                    {this.state.user_info.address}
                  </Text>
                </View>
                <View style={styles.sectionsubmit}>
                  <TouchableOpacity
                    style={styles.submit}
                    onPress={this._logout}>
                    <Text style={styles.textsubmit}>Đăng xuất</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        ) : (
          <View style={styles.section1}>
            <ScrollView style={{minHeight: height}}>
              <View style={styles.btnTextHolder}>
                <View
                  style={{
                    height: this.state.expandedOne ? null : 0,
                    overflow: 'hidden',
                  }}>
                  <View style={[styles.expand, styles.container]}>
                    <Text style={styles.extext}>Tài khoản</Text>
                    <TextInput
                      style={[styles.fill]}
                      placeholder="Nhập tài khoản"
                      autoCorrect={false}
                      returnKeyType="done"
                      placeholderTextColor={colors.textColor}
                      onChangeText={username => this.setState({username})}
                      value={username}
                    />
                  </View>

                  <View style={[styles.expand, styles.container]}>

                      <Text style={styles.extext}>Email</Text>

                        <TextInput
                          style={[styles.fill]}
                          placeholder="Nhập email"
                          autoCorrect={false}
                          returnKeyType="done"
                          placeholderTextColor={colors.textColor}
                          onChangeText={email => this.setState({email})}
                          value={email}
                        />

                  </View>
                  <View style={[styles.expand, styles.container]}>
                    <Text style={styles.extext}>Mật khẩu</Text>
                      <TextInput
                        style={[styles.fill]}
                        placeholder="Nhập mật khẩu"
                        autoCorrect={false}
                        secureTextEntry={true}
                        returnKeyType="done"
                        placeholderTextColor={colors.textColor}
                        onChangeText={password => this.setState({password})}
                        value={password}
                      />

                  </View>
                  <View style={[styles.expand, styles.container]}>
                      <Text style={styles.extext}>Tên</Text>

                      <TextInput
                        style={styles.fill}
                        placeholder="Điền tên"
                        autoCorrect={false}
                        returnKeyType="done"
                        placeholderTextColor={colors.textColor}
                        onChangeText={name => this.setState({name})}
                        value={name}
                      />

                  </View>
                  <View style={[styles.expand, styles.container]}>
                      <Text style={styles.extext}>Số điện thoại</Text>
                      <TextInput
                        style={styles.fill}
                        placeholder="Điền số điện thoại"
                        autoCorrect={false}
                        returnKeyType="done"
                        placeholderTextColor={colors.textColor}
                        onChangeText={phone => this.setState({phone})}
                        value={phone}
                      />

                  </View>
                  <View style={[styles.expand, styles.container]}>
                    <Text style={styles.extext}>Tỉnh thành phố</Text>

                        <Picker
                          selectedValue={this.state.city}
                          style={[
                            {
                              color: colors.textColor,
                              height:45,
                              width: width * 0.5,
                            },
                          ]}
                          itemStyle={{fontSize: 10}}
                          onValueChange={(itemValue, itemIndex) => {
                            this.setState({
                              city: itemValue,
                              district: '',
                              guild: '',
                              guilds: [],
                              districts: [],
                            });

                            apis.getDistrict(itemValue).then(res => {
                              this.setState({
                                districts: res.data.rows,
                              });
                            });
                          }}>

                          <Picker.Item value="" label="Chọn thành phố?" />
                          {this.state.citys.map((val, index) => {
                            return (
                              <Picker.Item
                                key={index}
                                label={val.name}
                                value={val.idProvince}
                              />
                            );
                          })}
                        </Picker>

                  </View>
                  <View style={[styles.expand, styles.container]}>
                    <Text style={styles.extext}>Quận huyện</Text>

                        <Picker
                          selectedValue={this.state.district}
                          style={[
                            styles.extext,
                            {
                              color: colors.textColor,
                              width: width * 0.5,
                              height:45,
                            },
                          ]}
                          itemStyle={{fontSize: 10}}
                          onValueChange={(itemValue, itemIndex) => {
                            this.setState({
                              district: itemValue,
                              guild: '',
                              guilds: [],
                            });
                            apis.getGuild(itemValue).then(res => {
                              this.setState({
                                guilds: res.data.rows,
                              });
                            });
                          }}>
                          <Picker.Item value="" label="Chọn quận huyện?" />
                          {this.state.districts.map((val, index) => {
                            return (
                              <Picker.Item
                                key={index}
                                label={val.name}
                                value={val.idDistrict}
                              />
                            );
                          })}
                        </Picker>

                  </View>
                  <View style={[styles.expand, styles.container]}>
                    <Text style={styles.extext}>Địa chỉ cụ thể</Text>
                    <TextInput
                        style={[
                          styles.fill,
                          {width: width-40, marginTop: 15, padding: 0,color: colors.textColor, },
                        ]}
                        placeholder="Nhập địa chỉ cụ thể"
                        autoCorrect={false}
                        returnKeyType="done"
                        placeholderTextColor={colors.textColor}
                        onChangeText={address => this.setState({address})}
                        value={address}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.sectionsubmit]}>
                <ThemeProvider >
                <Button
                  titleStyle={{textTransform: 'uppercase'}}
                  title="Cập nhật"
                  buttonStyle={[
                    globalStyles.btn,
                    globalStyles.btnPrimary,
                    {width: width-40},
                  ]}
                  onPress={this._save}
                />
                </ThemeProvider>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {

    fontSize: 16,
    padding:5,
  },

  s1text: {
    marginLeft: 10,
  },
  text: {
    fontSize: 19,
    color: 'black',
  },
  btnTextHolder: {},
  avatar: {
    borderColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
  },
  sectionavatar: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  sectionsubmit: {
    alignItems: 'center',
    marginTop: 100,
  },
  expand: {
    borderBottomWidth: 1,
    marginTop: 15,
    borderColor: '#e9edf2',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingLeft: 20,
    paddingRight:20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  extext:{
    fontSize: 16,
    color: colors.introColor,
    height:30,
    fontStyle:'italic',
  },

  infotext: {
    color: '#2f3657',
    borderBottomColor: '#e9edf2',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 20,
  },
});
export default connect(mapStateToProps)(Account);
