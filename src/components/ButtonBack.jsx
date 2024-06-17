/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';
import Button from './Button';

function ButtonBack({ onClick }) {
    const navigate = useNavigate();
    return (
        <Button
            type="back"
            onClick={(e) => {
                e.preventDefault();
                navigate(-1);
            }}
        >
            &larr; Back
        </Button>
    );
}

export default ButtonBack;
