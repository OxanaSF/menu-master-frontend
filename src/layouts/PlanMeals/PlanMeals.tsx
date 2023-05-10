import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FoodPlanner = () => {
  const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thur', 'Fr', 'Sat', 'Sun'];
  const mealCategories = ['Breakfast', 'Brunch', 'Lunch', 'Snack', 'Dinner'];

  const columnWidth = Math.floor(12 / (daysOfWeek.length + 1));

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Weekly Food Planner</h2>
      <Row className="text-center">
        <Col xs={12} md={columnWidth} className="mb-4"></Col>{' '}
        {/* Empty column */}
        {daysOfWeek.map((day) => (
          <Col key={day} xs={12} md={columnWidth} className="mb-4">
            <h4>{day}</h4>
          </Col>
        ))}
      </Row>
      {mealCategories.map((category) => (
        <Row key={category}>
          <Col xs={12} md={columnWidth} className="mb-4">
            <h4>{category}</h4>
          </Col>
          {daysOfWeek.map((day) => (
            <Col
              key={`${day}-${category}`}
              xs={12}
              md={columnWidth}
              className="mb-4"
            >
              <div className="food-card">
                {/* Render the food items or meal plans for each day and category */}
                {/* Example: <p>{foodItems[day][category]}</p> */}
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default FoodPlanner;
