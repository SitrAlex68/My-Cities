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
          email:"",
          pass:"" 
        }

    }


  

checkpassword(){
const formdata = new FormData;
formdata.append("email",this.state.email);
formdata.append("pass",this.state.pass);

}


  connexion(){
    const {navigate} = this.props.navigation;

    if(this.state.email == "" || this.state.pass == ""){
      Alert.alert("Veuillez entrer des informations valides.");
      return false;}

      const formdata = new FormData;
      formdata.append("email",this.state.email);
      formdata.append("pass",this.state.pass);

      fetch('http://jdevalik.fr/api/mycities/checkpass.php', {
        method: 'POST', 
        body: formdata, 
        headers: {
            "Content-Type": "multipart/form-data"
        },
    }).then((response) => response.json())
        .then((json) => {
          if(json != false){
            const action2 = {type:"crnt_role",value:json[0].user_status};
            this.props.dispatch(action2);
            const action1 = {type:"crnt_user",value:this.state.email};
            this.props.dispatch(action1);
            const action3 = {type:"crnt_id",value:json[0].user_id}
            this.props.dispatch(action3);
            navigate("valid");
          }else{
            return false;
          }
    })
    

  }

  test(){
    console.log(this.checkpassword());
  }

    render(){
      const {navigate} = this.props.navigation;
        return (
            <View style={styless.container}>
                      <Text style={{color:'blue',fontSize: 22 , textAlign:'center'}}>Connexion</Text>
                      <View style={{height: 5}}/>
                      <TextInput style={styles.input} value={this.state.email} onChangeText={text=> this.setState({email:text})}  placeholder="Email" keyboardType="text"/>
                      <View style={{height: 5}}/>
                      <TextInput style={styles.input} value={this.state.pass} onChangeText={text=> this.setState({pass:text})} placeholder="Mot de passe" keyboardType="text"/>
                      <View style={{height: 5}}/>
                      <Button style={{margin:10}} color='blue'  title="Connexion" onPress={() => this.connexion()}/>
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