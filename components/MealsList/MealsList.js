import {FlatList, Text, View, StyleSheet} from 'react-native';
import MealItem from './MealItem';
import { CATEGORIES } from '../../data/dummy-data';
function MealsList({items, catId}){

    function renderMealItem(itemData){
        let categoryColor;
        if(catId){
            categoryColor = CATEGORIES.find((category) => category.id === catId).color;
        }
        else{
            categoryColor='#997b66';
        }
        const mealItemProps = {
            id: itemData.item.id,
            title: itemData.item.title,
            imageUrl: itemData.item.imageUrl,
            affordability: itemData.item.affordability,
            duration: itemData.item.duration,
            complexity: itemData.item.complexity,
            navColor: categoryColor
        };
        return (
            <MealItem {...mealItemProps}  />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList data={items} keyExtractor={(item)=> item.id} renderItem={renderMealItem} />
        </View>
    );
}

export default MealsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }
})