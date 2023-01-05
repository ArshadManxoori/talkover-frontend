import React, { useState } from 'react';
import Card from '../../../Components/Shared/Card/Card';
import Button from '../../../Components/Shared/Button/Button';
import TextInput from '../../../Components/Shared/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';
import styles from './StepName.module.css';

const StepName = ({ onNext }) => {
    const { name } = useSelector((state) => state.activate);
    const dispatch = useDispatch();
    const [fullName, setfullName] = useState(name);

    function nextStep() {
        if (!fullName) {
            alert('Please enter your name');
            return;
        }
        dispatch(setName(fullName));
        onNext();
    }
    return (
        <>
            <Card title="What’s your full name?" icon="goggle-emoji">
                <TextInput
                    value={fullName}
                    onChange={(e) => setfullName(e.target.value)}
                />
                <p className={styles.paragraph}>
                    People use real names at codershouse :) !
                </p>
                <div>
                    <Button onClick={nextStep} text="Next" />
                </div>
            </Card>
        </>
    );
};

export default StepName;
