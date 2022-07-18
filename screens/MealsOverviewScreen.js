import { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import MealsList from '../components/MealsList/MealsList';
import {CATEGORIES, MEALS} from '../data/dummy-data';

function MealsOverviewScreen({navigation, route}){
    const catId = route.params.categoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    useLayoutEffect(() => {
        const selectedCategory = CATEGORIES.find((category) => category.id === catId);
        const categoryTitle = selectedCategory.title;
        const categoryColor = selectedCategory.color;
        navigation.setOptions({
            title: categoryTitle,
            headerStyle: {backgroundColor: categoryColor},
        });
    }, [catId, navigation]);
    
    return <MealsList items={displayedMeals} catId={catId} />
    
}

export default MealsOverviewScreen;

