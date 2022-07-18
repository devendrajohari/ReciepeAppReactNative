import { useContext, useLayoutEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';

import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import IconButton from "../components/IconButton";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
// import { FavoritesContext } from "../store/context/favorites-context";
import {addFavorite, removeFavorite} from '../store/redux/favorites';

function MealDetailScreen({route, navigation}){
    // const favoriteMealsCtx = useContext(FavoritesContext);

    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    const dispatch = useDispatch();

    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);
    
    // const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
    const mealIsFavorite = favoriteMealIds.includes(mealId);
    function changeFavoriteStatusHandler (){
        if(mealIsFavorite){
            // favoriteMealsCtx.removeFavorite(mealId);
            dispatch(removeFavorite({
                id: mealId
            }));
        }else{
            // favoriteMealsCtx.addFavorite(mealId);
            dispatch(addFavorite({
                id: mealId
            }));
        }
    }
    useLayoutEffect(() => {
        const mealsTitle = selectedMeal.title;
        const mealsColor = route.params.navColor;
        navigation.setOptions({
            title: mealsTitle,
            headerStyle: {backgroundColor: mealsColor},
            headerRight: () => {
                return (<IconButton 
                icon={mealIsFavorite ? 'star': 'star-outline'}
                color="white"
                onPress={changeFavoriteStatusHandler}
                />
                );

            }
        });
    }, [navigation, changeFavoriteStatusHandler]);
   
    return (
        <ScrollView style={styles.rootContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: selectedMeal.imageUrl}} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{selectedMeal.title}</Text>
            </View>
            <View>
             <MealDetails 
             duration={selectedMeal.duration} 
             affordability={selectedMeal.affordability} 
             complexity={selectedMeal.complexity}
             textStyle={styles.detailText}
              />   
            </View>
            <View style={styles.listOuterContainer}>
            <View style={styles.listContainer}>
                <Subtitle>Ingredients</Subtitle>
                <List data={selectedMeal.ingredients} />
                <Subtitle>Steps</Subtitle>
                <List data={selectedMeal.steps} />

            </View>
            </View>
            
    </ScrollView>
    );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    imageContainer: {
        margin: 10,
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: 350,
    },
    titleContainer: {
        marginLeft: 15,
        marginRight: 15,
        borderWidth: 5,
        borderColor: 'white',
        backgroundColor: '#d6ce93',
        padding: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    detailText: {
        color: '#b23a48',
        fontSize: 15,
    },
    listOuterContainer:{
        alignItems: 'center',
    },
    listContainer:{
        width: '80%'
    }
});