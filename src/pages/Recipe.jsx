import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from 'react'
function Recipe() {
  let params = useParams();
  const [recipe, setRecipe] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");
  const fetchRecipe = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
    const recipe = await data.json();
    setRecipe(recipe);
  }
  useEffect(() => {
    fetchRecipe();
  },[params.name])

  return (
    <DetailWrapper>
      <div>
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt="" />
      </div>
      <Info>
        <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}> Instructions</Button>
        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
        {activeTab === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{__html: recipe?.summary}}/>
            <h3 dangerouslySetInnerHTML={{__html: recipe.instructions}}/>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul>
            {recipe.extendedIngredients?.map((ingredient) => {
              return (
                <li key={ingredient.id}>{ingredient.original}</li>
              )
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  )
}
const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active{
    background: linear-gradient(45deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`
const Info = styled.div`
  margin-left: 10rem;
`
export default Recipe