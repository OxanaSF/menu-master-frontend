import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PLANS } from '../../utils/plans';
import MealPlan from './MealPlan';

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

  const navigate = useNavigate();

  const generateUserCredentials = () => {
    axios
      .post(
        ``,
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
      const userName = 'ovtyutchevagmailgmail-com2';

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
    <div>
      {!weeklyPlanIsSet && (
        <Container>
          <Row>
            <Col>
              <h1 className="text-center mt-5">7-day Meal Plans</h1>
            </Col>
          </Row>

          <Row className="mt-3">
            {PLANS.map((plan) => (
              <Col key={plan.id} sm={4}>
                <Card className="mb-4">
                  {/* <Card.Img variant="top" src={`image${plan.id}.jpg`} /> */}
                  <Card.Body>
                    <Card.Title>{plan.name}</Card.Title>
                    <Card.Text>{plan.description}</Card.Text>
                    <button
                      className="btn btn-sm main-color btn-lg text-white"
                      onClick={() => handleGeneratePlan(plan.id)}
                    >
                      Generate
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {weeklyPlanIsSet && <MealPlan weeklyPlanData={weeklyPlanData} setWeeklyPlanIsSet={setWeeklyPlanIsSet}/>}
    </div>
  );
};

export default FoodPlanner;
