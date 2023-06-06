import { SafeAreaView, View, Text, Image, Button } from "react-native";
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
                    !this.state.bd_favorite ? this.addToFavorite : this.removeFavorite
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