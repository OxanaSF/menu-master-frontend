import { useState, useEffect } from "react";
import axios from "axios";

type Recipe = {
  id: number;
  title: string;
  // other properties of the recipe
};

type WeeklyMenuItem = {
  day: string;
  recipe: Recipe | null;
};

type WeeklyMenuProps = {
    weeklyMenu: WeeklyMenuItem[];
    setWeeklyMenu: React.Dispatch<React.SetStateAction<WeeklyMenuItem[]>>;
  };

export const WeeklyMenu = ({ weeklyMenu, setWeeklyMenu }: WeeklyMenuProps) => {
  const [daySelection, setDaySelection] = useState<string>("");
  const [availableRecipes, setAvailableRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/recipes")
      .then((response) => {
        setAvailableRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddToMenu = () => {
    if (daySelection && !weeklyMenu.find((item) => item.day === daySelection)) {
      setWeeklyMenu([...weeklyMenu, { day: daySelection, recipe: null }]);
      setDaySelection("");
    }
  };

  const handleRemoveFromMenu = (day: string) => {
    setWeeklyMenu(weeklyMenu.filter((item: WeeklyMenuItem) => item.day !== day));
  };

  const handleRecipeSelect = (day: string, recipe: Recipe) => {
    const updatedMenu = [...weeklyMenu];
    const selectedItem = updatedMenu.find((item) => item.day === day);
    if (selectedItem) {
      selectedItem.recipe = recipe;
      setWeeklyMenu(updatedMenu);
    }
  };

  const renderMenuItems = () => {
    return weeklyMenu.map((item: WeeklyMenuItem, index: number) => (
      <div key={index} className="card mt-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{item.day}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Remove"
              onClick={() => handleRemoveFromMenu(item.day)}
            ></button>
          </div>
          {item.recipe ? (
            <p className="card-text">{item.recipe.title}</p>
          ) : (
            <div className="input-group">
              <select
                className="form-select"
                value={daySelection}
                onChange={(e) => setDaySelection(e.target.value)}
              >
                <option value="" disabled>
                  Select recipe...
                </option>
                {availableRecipes.map((recipe) => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.title}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleAddToMenu}
              >
                Add to menu
              </button>
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <>
      {renderMenuItems()}
      {weeklyMenu.length === 0 && <p>No saved weekly menu.</p>}
    </>
  );
};
