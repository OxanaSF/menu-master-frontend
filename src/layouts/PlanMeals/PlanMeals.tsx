import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import SavedRecipe from '../UserDashboard/SavedRecipe';
import axios from 'axios';
import { RecipeModel } from '../../models/RecipeModel';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/selectors/userSelectors';

const FoodPlanner = () => {
  const [startDate, setStartDate] = useState('');
  const [weeklyPlan, setWeeklyPlan] = useState<RecipeModel[]>([]);
  const userId = useSelector(selectUserId);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const fetchWeeklyPlan = async () => {
    console.log("Fetching weekly plan...")
    console.log("userId: ", userId)
    console.log("startDate: ", startDate)
    try {
      const apiKey = ""; 
      const url = `https://api.spoonacular.com/mealplanner/${userId}/week/${startDate}?hash=${userId}&apiKey=${apiKey}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        const data = response.data;
        setWeeklyPlan(data);
      } else {
        throw new Error('Failed to fetch weekly plan');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchWeeklyPlan();
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Food Planner</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date (yyyy-mm-dd)</Form.Label>
              <Form.Control
                type="text"
                value={startDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit">Fetch Weekly Plan</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        {weeklyPlan.map((recipe) => (
          <SavedRecipe
            key={recipe.id}
            recipe={recipe}
            onClose={() => {}}
          />
        ))}
      </Row>
    </Container>
  );
};

export default FoodPlanner;
