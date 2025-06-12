import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeSteps = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost/recipe-app/api/recipes.php');
        
        // Ensure the response data is an array
        const recipesData = Array.isArray(response.data) ? response.data : [];
        
        setRecipes(recipesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to load recipes');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const fetchSteps = async (recipeId) => {
    try {
      const response = await axios.get(`http://localhost/recipe-app/api/steps.php?recipe_id=${recipeId}`);
      
      // Ensure the steps data is an array
      const stepsData = Array.isArray(response.data) ? response.data : [];
      
      setSteps(stepsData);
      setSelectedRecipe(recipes.find(recipe => recipe.id === recipeId));
    } catch (error) {
      console.error('Error fetching steps:', error);
      setError('Failed to load steps');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="recipe-container">
      <h1>Recipe Steps</h1>
      
      <div className="recipe-list">
        <h2>Choose a Recipe</h2>
        {recipes.length > 0 ? (
          <ul>
            {recipes.map(recipe => (
              <li key={recipe.id} onClick={() => fetchSteps(recipe.id)}>
                {recipe.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes found</p>
        )}
      </div>

      {selectedRecipe && (
        <div className="recipe-details">
          <h2>{selectedRecipe.name}</h2>
          <p>{selectedRecipe.description}</p>
          <p>Prep: {selectedRecipe.prep_time} mins | Cook: {selectedRecipe.cook_time} mins | Serves: {selectedRecipe.servings}</p>
          
          <h3>Steps:</h3>
          {steps.length > 0 ? (
            <ol className="steps-list">
              {steps.map(step => (
                <li key={step.id}>{step.instruction}</li>
              ))}
            </ol>
          ) : (
            <p>No steps found for this recipe</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeSteps;