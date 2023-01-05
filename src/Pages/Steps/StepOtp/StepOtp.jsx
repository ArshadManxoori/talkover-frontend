import React,{useState} from 'react'
import Card from '../../../Components/Shared/Card/Card'
import Button from '../../../Components/Shared/Button/Button'
import TextInput from '../../../Components/Shared/TextInput/TextInput'
import styles from './StepOtp.module.css';

import { verifyOtp } from '../../../http';
import {useSelector} from'react-redux';
import { setAuth } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';

const StepOtp = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const {phone, hash} = useSelector((state) => state.auth.otp);

  async function submit(){ 
    if(!otp || !phone || !hash) return;

    try {                           //body of rqst
      const {data} = await verifyOtp({otp, phone, hash});
      console.log(data);
      dispatch(setAuth(data));  //data = action
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just text you" icon="lock-emoji">
          <TextInput value={otp} onChange={(e)=> setOtp(e.target.value)}/>
          <div>
            <div className={styles.actionButtonWrap}>
              <Button onClick={submit} text="Next"/>
            </div>
            <p className={styles.bottomParagraph}>
              By entering your number, you're agreeing of our Terms of Service and Privacy Policy. Thanks!
            </p>
          </div>
        </Card>
      </div>
    </>
  )
}

export default StepOtp