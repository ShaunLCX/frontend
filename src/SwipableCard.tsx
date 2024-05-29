import React, { useState } from 'react';
import './swipablecard.css';
import { User } from '../../model/User';

interface SwipableCardProps {
    user: User;
    onSwipe: (userId: string, action: 'like' | 'dislike') => void;
    isTop: boolean;
}

const SwipableCard: React.FC<SwipableCardProps> = ({ user, onSwipe, isTop }) => {
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [action, setAction] = useState<'like' | 'dislike' | null>(null);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isTop) return; // Only the top card should be draggable
        setDragging(true);
        setStartX(event.clientX);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (dragging) {
            const deltaX = event.clientX - startX;
            setCurrentX(deltaX);

            if (deltaX > 100) {
                setAction('like');
            } else if (deltaX < -100) {
                setAction('dislike');
            } else {
                setAction(null);
            }
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
        if (action) {
            onSwipe(user.id, action);
        }
        setCurrentX(0);
        setAction(null);
    };

    const getCardClass = () => {
        let className = 'swipable-card';
        if (!isTop) className += ' hidden'; // Hide non-top cards
        if (dragging) className += ' dragging';
        if (action === 'like') className += ' like';
        if (action === 'dislike') className += ' dislike';
        return className;
    };

    return (
        <div
            className={getCardClass()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ transform: `translateX(${currentX}px)`, opacity: dragging ? 0.9 : 1 }}
        >
            <h2>{user.name}</h2>
            <p>Gender: {user.gender}</p>
            <p>Location: {user.location}</p>
            <p>University: {user.university}</p>
            <p>Interests: {user.interests}</p>
        </div>
    );
};

export default SwipableCard;
