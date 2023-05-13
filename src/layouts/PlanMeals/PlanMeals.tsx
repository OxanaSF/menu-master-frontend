import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
} from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/selectors/userSelectors';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

type WeeklyPlanData = {
  id: number;
  name: string;
  days: [];
};

const FoodPlanner = () => {
  const [startDate, setStartDate] = useState('');
  const [weeklyPlanId, setWeeklyPlanId] = useState(128);
  const [weeklyPlanData, setWeeklyPlanData] = useState<WeeklyPlanData | null>(
    null
  );

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 1;

  // const userId = useSelector(selectUserId);
  const [userSpoonacularId, setUserSpoonacularId] = useState(
    'ovtyutchevagmailgmail-com0'
  );

  const navigate = useNavigate();

  const generateUserCredentials = () => {
    axios
      .post(
        `https://api.spoonacular.com/users/connect?apiKey=`,
        {
          username: 'ovtyutcheva@gmail@gmail.com',
          firstName: 'Oxana',
          lastName: 'Howard',
          email: 'ovtyutcheva@gmail@gmail.com',
        }
      )
      .then((response) => {
        console.log('SUCCESS', response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const PLANS = [
    {
      id: 476,
      name: 'Keto Meal Plan',
      description:
        'a dietary plan that focuses on consuming high-fat, low-carbohydrate foods to induce a state of ketosis in the body for weight loss and increased energy',
    },
    {
      id: 128,
      name: '1500 Calorie Meal Plan',
      description:
        'a dietary plan designed to provide a daily intake of 1500 calories, typically aiming for balanced nutrition while creating a calorie deficit for weight management or certain health goals',
    },
    {
      id: 124,
      name: 'Vegetarian Meal Plan',
      description:
        'a dietary plan that excludes meat and seafood, focusing on plant-based foods such as fruits, vegetables, grains, legumes, and dairy products for nutrition and sustainability reasons',
    },
    {
      id: 409,
      name: 'week 1 Vegan',
      description:
        'is a meal plan designed for individuals following a vegan lifestyle, incorporating plant-based foods and excluding all animal products, including meat, dairy, eggs, and honey',
    },
    {
      id: 578,
      name: 'Whole30 Meal Plan',
      description:
        "a 30-day dietary plan that eliminates certain food groups such as grains, dairy, legumes, sugar, and processed foods, aiming to reset the body's relationship with food and improve overall health",
    },
    {
      id: 161,
      name: 'Almost Meatless',
      description:
        'a meal plan focuses on reducing meat consumption by incorporating a variety of plant-based foods while occasionally including small portions of meat or fish for a balanced and sustainable approach to eating',
    },
    {
      id: 1272,
      name: 'Super budget week',
      description:
        'a meal plan is designed to provide affordable and cost-effective meals, utilizing inexpensive ingredients and budget-friendly recipes without compromising on taste and nutrition',
    },
    {
      id: 217,
      name: 'smoothie and salad week',
      description:
        'meal plan that emphasizes the consumption of nutrient-rich smoothies and salads, providing a refreshing and health-conscious approach to eating with a focus on fruits, vegetables, and greens',
    },
    {
      id: 1745,
      name: 'easy-carb-week',
      description:
        'a meal plan is designed to provide simple and convenient meals with a focus on carbohydrate-rich foods, offering quick and satisfying options for individuals seeking an easy approach to their carbohydrate intake',
    },
  ];

  const fetchWeeklyPlan = async () => {
    try {
      const apiKey = '';
      const hash = '';
      const userName = ';

      const url = `https://api.spoonacular.com/mealplanner/${userName}/templates/${weeklyPlanId}?hash=${hash}&apiKey=${apiKey}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        // console.log(response.data);
        console.log(response.data);
        // console.log(response.data.days[0].nutritionSummaryBreakfast);
        const fetchedWeeklyPlanData = response.data;
        setWeeklyPlanData(fetchedWeeklyPlanData);
        // navigate(`/meal-plan/${weeklyPlanId}`, {
        //   state: { fetchedWeeklyPlanData },
        // });
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

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>7-day Meal plans</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {weeklyPlanData && (
            <h3 className="meal-plan-title">{weeklyPlanData.name}</h3>
          )}
          {weeklyPlanData &&
            weeklyPlanData.days
              .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
              .map((day: any, index: number) => (
                <div key={index}>
                  <Pagination className="custom-pagination">
                    <Pagination.Prev
                      onClick={() => handlePageChange(activePage - 1)}
                      disabled={activePage === 1}
                    />
                    {Array.from(
                      {
                        length: Math.ceil(
                          weeklyPlanData.days.length / itemsPerPage
                        ),
                      },
                      (_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={index + 1 === activePage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      )
                    )}
                    <Pagination.Next
                      onClick={() => handlePageChange(activePage + 1)}
                      disabled={
                        activePage ===
                        Math.ceil(weeklyPlanData.days.length / itemsPerPage)
                      }
                    />
                  </Pagination>
                  <h5>Day: {day.day}</h5>
                  <ul>
                    {day.items.map((item: any, index: number) => (
                     item.value.title &&  <li className='title-list' key={index}> {item.value.title}</li>
                    ))}
                  </ul>
                 
                  <br></br>

                  <h3>Nutrition Summary</h3>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Nutrient</th>
                        <th>Amount</th>
                        <th>Unit</th>
                        <th>Percent Of Daily Needs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.nutritionSummary.nutrients.map(
                        (nutrient: any, index: number) => (
                          <tr key={index}>
                            <td>{nutrient.name}</td>
                            <td>{nutrient.amount}</td>
                            <td>{nutrient.unit}</td>
                            <td>{nutrient.percentOfDailyNeeds}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </div>
              ))}
        </Col>
      </Row>
      <Container>
        <Row className="mt-3">
          {PLANS.map((plan) => (
            <Col key={plan.id} sm={4}>
              <Card className="mb-4">
                {/* <Card.Img variant="top" src={`image${plan.id}.jpg`} /> */}
                <Card.Body>
                  <Card.Title>{plan.name}</Card.Title>
                  <Card.Text>{plan.description}</Card.Text>
                  <button
                    className="btn main-color btn-lg text-white"
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
    </Container>
  );
};

export default FoodPlanner;
