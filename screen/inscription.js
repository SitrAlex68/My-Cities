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



class Inscription extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          login:"",
          email: "",
          pass:"" 
        }
    }
  

  testinputs() {
    const {navigate} = this.props.navigation;

      const db = SQLite.openDatabase("data.db");
      const formdata = new FormData;

    
      if(this.state.login == "" || this.state.email == "" || this.state.pass == ""){
        Alert.alert("Veuillez remplir tous les champs.", "", [{text: "ok", onPress: () => console.log("test")}], {cancelable: false});
      }else{
        const action = {type:"add_user", value:{login:this.state.login,email:this.state.email, pass:this.state.pass}};
        db.transaction(trs => {
          trs.executeSql("INSERT INTO users (user_name , user_mail, user_pass) VALUES (?,?,?)", [this.state.login,this.state.email,this.state.pass]);
          formdata.append("login",this.state.login);
          formdata.append("mail",this.state.email);
          formdata.append("pass",this.state.pass);
          console.log(formdata);
          fetch('http://localhost:8080/api/add',{
            method: 'POST',
            body:formdata,
            headers:{
              "Content-Type":"multipart/form-data"
            }
          })

          navigate('login');
        });
        this.props.dispatch(action);
        
        console.log(this.props);
        
      }
  }

    render(){
        const {navigate} = this.props.navigation;

        return (
            <View style={styless.container}>
                      <Text style={{color:'blue',fontSize: 22 , textAlign:'center'}}>Inscription</Text>
                      <View style={{height: 5}}/>
                      <TextInput style={styles.input} value={this.state.login} onChangeText={text=> this.setState({login:text})}  placeholder="Login" keyboardType="text"/>
                      <View style={{height: 5}}/>
                      <TextInput style={styles.input} value={this.state.email} onChangeText={text=> this.setState({email:text})}  placeholder="e-mail" keyboardType="text"/>
                      <View style={{height: 5}}/>
                      <TextInput style={styles.input} value={this.state.pass} onChangeText={text=> this.setState({pass:text})} placeholder="Mot de passe" keyboardType="text"/>
                      <View style={{height: 5}}/>
                      <Button style={{margin:10}} color='blue'  title="Valider" onPress={() => this.testinputs()}/>
                      <Text>Déjà inscrit ?<Text style={{color:'blue'}} onPress={() => navigate('login')}>  connectez vous</Text></Text>
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
export default connect(mapStateToProps)(Inscription);