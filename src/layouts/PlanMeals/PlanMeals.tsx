import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

import { PLANS } from '../../utils/plans';
import MealPlan from './MealPlan';

import backgroundImage from '../../Images/PublicImages/dashboard-greens.png';
import './PlanMeals.css'

type WeeklyPlanData = {
  id: number;
  name: string;
  days: [];
};

const FoodPlanner = () => {
  const [weeklyPlanId, setWeeklyPlanId] = useState(128);
  const [weeklyPlanData, setWeeklyPlanData] = useState<WeeklyPlanData | null>(
    null
  );
  const [weeklyPlanIsSet, setWeeklyPlanIsSet] = useState(false);

  const generateUserCredentials = () => {
    axios
      .post(
        `https://api.spoonacular.com/users/connect?apiKey=`,
        {
          username: '',
          firstName: 'Oxana',
          lastName: 'Howard',
          email: '',
        }
      )
      .then((response) => {
        console.log('SUCCESS', response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const fetchWeeklyPlan = async () => {
    try {
      const apiKey = '';
      const hash = '';
      const userName = 'ovtyutchevagmailgmail-com3';

      const url = `https://api.spoonacular.com/mealplanner/${userName}/templates/${weeklyPlanId}?hash=${hash}&apiKey=${apiKey}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        console.log(response.data);
        const fetchedWeeklyPlanData = response.data;
        setWeeklyPlanData(fetchedWeeklyPlanData);
        // navigate(`/meal-plan/${weeklyPlanId}`);
        setWeeklyPlanIsSet(true);
      } else {
        throw new Error('Failed to fetch weekly plan');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGeneratePlan = (planId: number) => {
    setWeeklyPlanId(planId);
    fetchWeeklyPlan();
  };

  return (

    <div className={weeklyPlanIsSet ? 'plan-meals-no-image' : 'plan-meals-with-image'} >



    
      {!weeklyPlanIsSet && (
        <Container className='plan-meals-container'>
          <Row>
            <Col>
              <h1 className="text-center mt-5 meal-plans-title">
                7-day Meal Plans
              </h1>
              {/* <button onClick={generateUserCredentials}>Generate</button> */}
            
            </Col>
          </Row>

          <Row className="mt-3">
            {PLANS.map((plan) => (
              <Col key={plan.id} sm={4}>
                <Card
                  className="mb-4 meal-plan-card"
                  onClick={() => handleGeneratePlan(plan.id)}
                >
                  <Card.Body>
                    <Card.Title className="plan-name">{plan.name}</Card.Title>
                    <Card.Text>{plan.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {weeklyPlanIsSet && (
        <MealPlan
          weeklyPlanData={weeklyPlanData}
          setWeeklyPlanIsSet={setWeeklyPlanIsSet}
        />
      )}
    </div>
  );
};

export default FoodPlanner;
