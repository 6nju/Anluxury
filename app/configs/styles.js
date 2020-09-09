import {Dimensions, Orientation, StyleSheet} from 'react-native';
const win = Dimensions.get('window');
const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    alignSelf: 'stretch',
    width: win.width,
    height: win.height,
  },
});

const colors = {
  primaryColor: '#ed7ca8', 
  secondaryColor: '#BC664B',
  tertiaryColor: '#F05F42',
  backgroundColor: '#fff',
  whiteColor: '#fff',
  textColor: '#3f424a',
  introColor: '#979797',
  alertWarningColor:'#f5f5f5',

  PRIMARY:'#1abc9c',
  WHITE:'#ffffff',
  LIGHTGREEN:'#BABABA',
  GREEN:'#0da935',
  GRAY:'#f7f7f7',
  LIGHTGRAY: '#C7C7C7',
  DARKGRAY: '#5E5E5E',
  CGRAY: '#ececec',
  OFFLINE_GRAY: '#535353'
};
const RECIPE_ITEM_MARGIN = 30;
const globalStyles = {
  container: {
    flex: 1,
    width: win.width,
    paddingLeft: RECIPE_ITEM_MARGIN,
    paddingRight: RECIPE_ITEM_MARGIN,

  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  navigation:{

  },
  moduleWrapper: {
    clear: 'both',
    marginBottom: 20,
  },
  blockTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  blockTitleHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  blockTitleMore: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mainLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn:{
    padding: 12,
    marginBottom: 10,
  },
  btnPrimary:{
    backgroundColor:colors.primaryColor
  },
  btnWhite:{
    backgroundColor:colors.whiteColor
  },
  inputStyle:{
    borderColor:'#ececec',
  },
  loader: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  alertWarning:{
    backgroundColor: colors.alertWarningColor,
    padding: 15,
    borderRadius: 3,
    textAlign: 'center',
    marginTop:10,
    marginBottom:30,
  },
  modalFull: {
    backgroundColor: 'white',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  introWapper:{
    paddingLeft:30,
    paddingRight:30,
    paddingTop: 10,
  },
  introSwiper:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:25,
    position: 'relative',
  },
  introClose:{
    color: colors.introColor,
    padding:10,
    width: 100,
  },
  introLogo:{
    marginBottom:20,
  },
  introImg:{
    marginBottom:10,
  },
  introContent:{
    color: colors.introColor,
    textAlign: 'center',
  }
};

export {colors, globalStyles, styles};
