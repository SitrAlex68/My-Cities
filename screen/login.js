import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from "react-redux";
import * as SQLite from 'expo-sqlite';

class Login extends React.Component{
    constructor(props){
        super(props);

      this.state = {
          login:"",
          pass:"" 
        }

    }


    

    validation(){
      const {users} = this.props;
      console.log(this.props);
      for(let i=0;i<users.length;i++){
        if(users[i].login == this.state.login && this.state.pass == users[i].pass){
          return true
        } 
      }
      return false
    }



  testlogin(){
    
    this.checktable();
    if(this.state.login == "" || this.state.pass == ""){
      Alert.alert("non !");
    }else{
      this.checkpassword()
        /*
        const action2 = {type:"crnt_user",value:this.state.login};
        this.props.dispatch(action2);
        
        navigate("valid");
      }else{
        Alert.alert("non non non!");
      }*/
    }
  }


  checkpassword(){
    const {navigate} = this.props.navigation;
    let tdata = [];
    const db = SQLite.openDatabase("data.db");
    db.transaction(trs => {
    trs.executeSql("SELECT * FROM users WHERE user_name = ? AND user_pass = ?" , [this.state.login,this.state.pass] , (_, {rows: {_array}}) =>{
      tdata = _array
      console.log(tdata.length);
      if(tdata.length > 0){
        const action2 = {type:"crnt_user",value:this.state.login};
        this.props.dispatch(action2);
        navigate("valid");
      
      }else{
        Alert.alert("non non non!");
      }
    }
    );
    })
  }
  

  checktable(){
    console.log("test")
    const db = SQLite.openDatabase("data.db");
    db.transaction(trs => {
    trs.executeSql("SELECT * FROM users" , [] , (_, {rows: {_array}}) =>
    console.log(_array));
    })
  }



    render(){
      const {navigate} = this.props.navigation;
        return (
            <View style={styless.container}>
                      <Text style={{color:'blue',fontSize: 22 , textAlign:'center'}}>Connexion</Text>
                      <View style={{height: 5}}/>
                      <TextInput style={styles.input} value={this.state.login} onChangeText={text=> this.setState({login:text})}  placeholder="Login" keyboardType="text"/>
                      <View style={{height: 5}}/>
                      <TextInput style={styles.input} value={this.state.pass} onChangeText={text=> this.setState({pass:text})} placeholder="Mot de passe" keyboardType="text"/>
                      <View style={{height: 5}}/>
                      <Button style={{margin:10}} color='blue'  title="Connexion" onPress={() => this.testlogin()}/>
                      <TouchableOpacity><Text style={{color:'blue',fontSize:16, textAlign:'center'}} onPress={() => navigate('inscription')}>S'inscrire</Text></TouchableOpacity>

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
      margin:10,
      backgroundColor:'white',
    },
  });


  const styless = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  });


  const mapStateToProps = (state)=>{
    return state;}
export default connect(mapStateToProps)(Login);