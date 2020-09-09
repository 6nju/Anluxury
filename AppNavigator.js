import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Home from './app/Home';
import Detail from './app/Detail';
import Category from './app/Category';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Flashsale from './app/Flashsale';
import Cart from './app/Cart';
import Checkoutcomplete from './app/Checkoutcomplete';
import New from './app/New';
import Newdetail from './app/Newdetail';
import Pay from './app/Pay';
import User from './app/User';
import Love from './app/Love';
import NewTow from './app/NewTow';
import Login from './app/Login';
import Search from './app/Search';
import SaleHot from './app/SaleHot';
import RoleCustom from './app/RoleCustom';
import RestPassword from './app/RestPassword';
import searchRight from './app/searchRight';
import Log from './app/Log';
import Info from './app/Info';
import Account from './app/Account';
import BestSaler from './app/BestSaler';
import Register from './app/Register';
import RightMenu from './app/components/RightMenu';
import SidebarMenu from './app/components/SidebarMenu';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerActions } from 'react-navigation-drawer';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const AppNavigator = createStackNavigator({
Home: {
    screen: Home,
    navigationOptions: {
		headerShown: false,
	 },
},
Detail: {
    screen: Detail,
    navigationOptions: {
			headerShown: false,
	  },
},
Log: {
	screen: Log,
    navigationOptions: {
      headerShown: false,
    },
},
Info: {
    screen: Info,
    navigationOptions: {
      headerShown: false,
    },
},Category: {
    screen: Category,
    navigationOptions: {
      headerShown: false,
    },
},
Account: {
    screen: Account,
    navigationOptions: {
      headerShown: false,
    },
},
SaleHot: {
    screen: SaleHot,
    navigationOptions: {
      headerShown: false,
    },
},
searchRight: {
    screen: searchRight,
    navigationOptions: {
      headerShown: false,
    },
},
Search: {
    screen: Search,
    navigationOptions: {
      headerShown: false,
    },
},
Flashsale: {
    screen: Flashsale,
    navigationOptions: {
      headerShown: false,
    },
},
RoleCustom: {
    screen: RoleCustom,
    navigationOptions: {
      headerShown: false,
    },
},
Cart: {
    screen: Cart,
    navigationOptions: {
      headerShown: false,
    },
},
Love: {
    screen: Love,
    navigationOptions: {
      headerShown: false,
    },
},
Checkoutcomplete: {
    screen: Checkoutcomplete,
    navigationOptions: {
      headerShown: false,
    },
},
New: {
    screen: New,
    navigationOptions: {
      headerShown: false,
    },
},
NewTow: {
    screen: NewTow,
    navigationOptions: {
      headerShown: false,
    },
},
BestSaler: {
    screen: BestSaler,
    navigationOptions: {
      headerShown: false,
    },
},
Newdetail: {
    screen: Newdetail,
    navigationOptions: {
      headerShown: false,
    },
},
User: {
    screen: User,
    navigationOptions: {
      headerShown: false,
    },
},
RestPassword: {
    screen: RestPassword,
    navigationOptions: {
      headerShown: false,
    },
},
Pay: {
    screen: Pay,
    navigationOptions: {
      headerShown: false,
    },
},
Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
},
Register: {
    screen: Register,
    navigationOptions: {
      headerShown: false,
    },
},
});
const DrawerStack = createDrawerNavigator(
	{
		Main: AppNavigator
	},
	{
		drawerPosition: 'left',
		initialRouteName: 'Main',
		drawerWidth: 320,
		
		contentComponent: SidebarMenu,
		getCustomActionCreators: (route, stateKey) => { return { toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }) }; },
	},
)
const AllStack = createDrawerNavigator(
	{
		Right: DrawerStack
	},
	{
		getCustomActionCreators: (route, stateKey) => { return { toggleRightDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }) }; },
		drawerPosition: 'right',
		initialRouteName: 'Right',
		drawerWidth: width -50,
		
		contentComponent: RightMenu,
		
	},
	
);
export default createAppContainer(AllStack);