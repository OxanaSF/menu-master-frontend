import { RecipeCarousel } from './components/Carousel';
import { ExplorePopularRecipes } from './components/ExplorePopularRecipes';
import { Heros } from './components/Heros';

export const HomePage = () => {
  return (
    <>
      <ExplorePopularRecipes />
      {/* <RecipeCarousel /> */}
      <Heros />
    </>
  );
};
