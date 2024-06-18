import React from 'react';
import "../../styles/OrderCard.css";

export const OrderCard = ({ order, onToggleCompleted }) => {
    const renderCourses = (courses, category) => {
        return courses.map((course, index) => (
            <div key={index} className="course">
                <input
                    type="checkbox"
                    checked={course.completed}
                    onChange={() => onToggleCompleted(order.id, category, index)}
                />
                <div className={`course-name ${course.completed ? 'completed' : ''}`}>{course.name}</div>

            </div>
        ));
    };

    return (
        <div className={`order-card ${order.allCompleted ? 'done' : ''}`}>
            <div className="card-header">
                {/* <span className="order-id">{order.id}</span> */}
                <span className="table">Table: {order.table}</span>
                {order.allCompleted && <span className="done-indicator">Done</span>}
            </div>
            <div className="courses">
                <div className="category">
                    <div className="category-title">Starters</div>
                    {renderCourses(order.courses.starters, 'starters')}
                </div>
                <div className="category">
                    <div className="category-title">Mains</div>
                    {renderCourses(order.courses.mains, 'mains')}
                </div>
                <div className="category">
                    <div className="category-title">Desserts</div>
                    {renderCourses(order.courses.desserts, 'desserts')}
                </div>
            </div>
        </div>
    );
}