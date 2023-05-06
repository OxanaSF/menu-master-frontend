import React, { useState } from 'react';

const SelectBarForm = () => {
  const [intolerances, setIntolerances] = useState('');
  const [equipment, setEquipment] = useState('');
  const [includeIngredients, setIncludeIngredients] = useState('');
  const [excludeIngredients, setExcludeIngredients] = useState('');
  const [type, setType] = useState('');
  const [instructionsRequired, setInstructionsRequired] = useState(false);
  const [fillIngredients, setFillIngredients] = useState(false);
  const [addRecipeInformation, setAddRecipeInformation] = useState(false);
  const [addRecipeNutrition, setAddRecipeNutrition] = useState(false);
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [recipeBoxId, setRecipeBoxId] = useState(0);
  const [titleMatch, setTitleMatch] = useState('');
  const [maxReadyTime, setMaxReadyTime] = useState(0);
  const [ignorePantry, setIgnorePantry] = useState(true);
  const [sort, setSort] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [minCarbs, setMinCarbs] = useState(0);
  const [maxCarbs, setMaxCarbs] = useState(0);
  const [minProtein, setMinProtein] = useState(0);
  const [maxProtein, setMaxProtein] = useState(0);
  const [minCalories, setMinCalories] = useState(0);
  const [maxCalories, setMaxCalories] = useState(0);
  const [minFat, setMinFat] = useState(0);
  const [maxFat, setMaxFat] = useState(0);

  return (
    <div>
      <div>
        <label htmlFor="intolerances">Intolerances:</label>
        <input
          type="checkbox"
          id="intolerances"
          // checked={intolerances}
          // onChange={(e) => setIntolerances(e.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="equipment">Equipment:</label>
        <input
          type="checkbox"
          id="equipment"
          // checked={equipment}
          // onChange={(e) => setEquipment(e.target.checked)}
        />
      </div>
      {/* Add more checkboxes for other options */}
    </div>
  );
};

export default SelectBarForm;
