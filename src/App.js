import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Meals from './Pages/Meals/Meals';
import Profile from './Pages/Profile';
import Drinks from './Pages/Drinks/Drinks';
import MealsDetails from './Pages/Meals/MealsDetails';
import DrinksDetails from './Pages/Drinks/DrinksDetails';
import DrinkProgress from './Pages/Drinks/DrinkProgress';
import MealsProgress from './Pages/Meals/MealsProgress';
import Explore from './Pages/Explore/Explore';
import ExploreDrinks from './Pages/Explore/ExploreDrinks';
import ExploreMeals from './Pages/Explore/ExploreMeals';
import MealsByIngredients from './Pages/Explore/MealsByIngredients';
import MealsByOrigin from './Pages/Explore/MealsByOrigin';
import DrinksByIngredients from './Pages/Explore/DrinksByIngredients';
import Done from './Pages/Done';
import Favorites from './Pages/Favorites';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Meals } />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <MealsDetails { ...props } /> }
        />
        <Route
          path="/comidas/:id/in-progress"
          render={ (props) => <MealsProgress { ...props } /> }
        />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <DrinksDetails { ...props } /> }
        />
        <Route
          path="/bebidas/:id/in-progress"
          render={ (props) => <DrinkProgress { ...props } /> }
        />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreMeals } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ MealsByIngredients }
        />
        <Route
          path="/explorar/comidas/area"
          component={ MealsByOrigin }
        />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ DrinksByIngredients }
        />
        <Route path="/receitas-feitas" component={ Done } />
        <Route path="/receitas-favoritas" component={ Favorites } />
      </Switch>
    </Provider>
  );
}

export default App;
