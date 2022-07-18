// import { useContext } from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text} from 'react-native';
import MealsList from '../components/MealsList/MealsList';
import { MEALS } from '../data/dummy-data';
// import { FavoritesContext } from '../store/context/favorites-context';

function FavoritesScreen(){
    // const favoriteMealsCtx = useContext(FavoritesContext);
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    const favoriteMeals = MEALS.filter(meal => favoriteMealIds.includes(meal.id));

    if(favoriteMeals.length === 0){
        return (
            <View style={styles.rootContainer}>
                <Text style={styles.text}>You have no favorite meals yet.</Text>
            </View>
        )
    }else{
        return <MealsList items={favoriteMeals} />;

    }
}

export default FavoritesScreen;


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
})