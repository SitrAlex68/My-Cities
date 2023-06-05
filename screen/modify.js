import React from 'react';
import WhiteButton from '../components/white_button';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput
} from 'react-native';
import {connect} from "react-redux";

import * as SQLite from 'expo-sqlite';


class Modify extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login:"" ,
            email: "",
            pass:"" 
          }
}

componentDidMount(){
    
    const {crnt_usr} = this.props;
    console.log({crnt_usr})
    var tdata;
    const db = SQLite.openDatabase("data.db");
    db.transaction(trs => {
        trs.executeSql("SELECT * FROM users WHERE user_name = ?", [crnt_usr] , (_, {rows: {_array}}) =>{
        console.log(_array)
        tdata = _array
        this.setState({login:tdata[0].user_name})
        this.setState({email:tdata[0].user_mail})
        this.setState({pass:tdata[0].user_pass})
    });})
}


valid(){
    const {crnt_usr} = this.props;
    var tdata;
    const {navigate} = this.props.navigation ;
    const db = SQLite.openDatabase("data.db");
    db.transaction(trs => {
        trs.executeSql("UPDATE users SET  user_name = ?, user_mail = ?, user_pass = ? WHERE user_name = ? ",[this.state.login,this.state.email,this.state.pass,crnt_usr]);
        const action2 = {type:"crnt_user",value:this.state.login};
        this.props.dispatch(action2);
        navigate("valid")
    })

}

render(){
        
    const {crnt_usr} = this.props;
    return (
        <View style={styless.container}>
                   <TextInput style={styles.input} value={this.state.login} onChangeText={text=> this.setState({login:text})}  placeholder="Login" keyboardType="text"/>
                   <TextInput style={styles.input} value={this.state.email} onChangeText={text=> this.setState({email:text})}  placeholder="Email" keyboardType="text"/>
                   <TextInput style={styles.input} value={this.state.pass} onChangeText={text=> this.setState({pass:text})}  placeholder="Password" keyboardType="text"/>
                   <WhiteButton style={{height: 20}} val = "Valider"  onPress={() => this.valid()}></WhiteButton>
        </View>
    )
}



}


const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 220,
      borderWidth: 1,
      padding: 10,
      backgroundColor:'white',
      margin: 10
    }
    ,
  });const styless = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  });

const mapStateToProps = (state)=>{
    return state;}
export default connect(mapStateToProps)(Modify);