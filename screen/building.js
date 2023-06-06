import { SafeAreaView, View, Text, Image, Button, Alert } from "react-native";
import React from "react";




export default class Building extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            bd_id : "",
            bd_name : "",
            bd_description : "",
            bd_region :
            {
                latitude : 0,
                longitude : 0,
                latitudeDelta : 0,
                longitudeDelta : 0
            },
            bd_address : "",
            bd_year : "",
            bd_architect : "",
            bd_image : "",
            bd_favorite : false
        }

}

selectData = () =>
{
    const formdata = new FormData;
    formdata.append("id", 1);
    const {navigate} = this.props.navigation
    fetch('http://jdevalik.fr/api/mycities/buildingbyid.php', {
                method: 'POST', 
                body: formdata, 
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }).then((response) => response.json())
                .then((json) => {
                    if(json != false){
                        console.log("json : " + json[0].build_name)
                        this.setState({bd_name: json[0].build_name})
                        this.setState({bd_description: json[0].build_desc})
                        this.setState({bd_year: json[0].build_year})
                        this.setState({bd_address: json[0].build_addresse})
                    }else{
                        navigate('Homepage');
                    }
                })
                .catch((error) => {
                        console.error(error);
                    }
                );
}

addToFavorite = () =>
{
    console.log("Add : " + this.state.bd_favorite)
    this.setState({bd_favorite : true})
}

removeFavorite = () =>
{
    console.log("Remove : " + this.state.bd_favorite)
    this.setState({bd_favorite : false})
}


render()
{
    return(
        <SafeAreaView>
            <View>
                <Text>URL image : {this.bd_image}</Text>
                <Image source={this.bd_image}/>
            </View>
            <Text>id : {this.state.bd_id}</Text>
            <Text>name : {this.state.bd_name}</Text>
            <Text>description : {this.state.bd_description}</Text>
            <Text>latitude : {this.state.bd_region.latitude}</Text>
            <Text>longitude : {this.state.bd_region.longitude}</Text>
            <Text>latitudeDelta : {this.state.bd_region.latitudeDelta}</Text>
            <Text>longitudeDelta : {this.state.bd_region.longitudeDelta}</Text>
            <Text>adresse : {this.state.bd_address}</Text>
            <Text>année : {this.state.bd_year}</Text>
            <Text>architecte : {this.state.bd_architect}</Text>
            <Button onPress={
                    this.selectData
                    //!this.state.bd_favorite ? this.addToFavorite : this.removeFavorite
                }
                title=
                {
                    !this.state.bd_favorite ? "Ajouter en favori" : "Enlever des favoris"
                }
            />
            <Text>dans favoris : {this.state.bd_favorite.toString()}</Text>
        </SafeAreaView>
    )
}
}