import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

import { selectUserId } from '../../store/selectors/userSelectors';

import './MealPlan.css';

type WeeklyPlanData = {
  id: number;
  name: string;
  days: {
    day: string;
    items: {
      value: {
        title: string;
      };
    }[];
    nutritionSummary: {
      nutrients: {
        name: string;
        amount: number;
        unit: string;
        percentOfDailyNeeds: number;
      }[];
    };
  }[];
};

type MealPlanProps = {
  weeklyPlanData: WeeklyPlanData | null;
  setWeeklyPlanIsSet: React.Dispatch<React.SetStateAction<boolean>>;
};

const MealPlan: React.FC<MealPlanProps> = ({
  weeklyPlanData,
  setWeeklyPlanIsSet,
}) => {
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 1;
  const userId = useSelector(selectUserId);

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const saveMealPlan = () => {
    // console.log(weeklyPlanData);
    console.log(weeklyPlanData?.name);
    const data = {
      userId: userId,
      planId: weeklyPlanData?.id,
      planName: weeklyPlanData?.name,
      mealPlanData: JSON.stringify(weeklyPlanData?.days),
    };

    axios
   
      .post(
        `http://localhost:8080/meal-plans/${userId}/save/${data.planId}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('Meal plan saved successfully!', response.data);
      })
      .catch((error) => {
        console.error('Error saving meal plan:', error);
      });
  };

  return (
    <Container className="my-5">
      <Row>
        <Row className="justify-content-end">
          <Col xs="auto">
            <Button
              onClick={() => setWeeklyPlanIsSet(false)}
              className="btn main-color btn-lg text-white"
            >
              Back to Meal Plans
            </Button>
            <Button
              onClick={saveMealPlan}
              className="btn main-color btn-lg text-white save-meal-plan-btn"
            >
              Save Meal Plan
            </Button>
          </Col>
        </Row>

        <Col>
          <Row>
            <Col>
              {' '}
              {weeklyPlanData && (
                <h3 className="meal-plan-title">{weeklyPlanData.name}</h3>
              )}
            </Col>
          </Row>

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
                    {day.items.map(
                      (item: any, index: number) =>
                        item.value.title && (
                          <li className="title-list" key={index}>
                            {' '}
                            {item.value.title}
                          </li>
                        )
                    )}
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
    </Container>
  );
};

export default MealPlan;
