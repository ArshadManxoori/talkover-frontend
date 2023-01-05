import React,{useState} from 'react'
import Card from '../../../../Components/Shared/Card/Card'
import Button from '../../../../Components/Shared/Button/Button'
import TextInput from '../../../../Components/Shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'
import { sendOtp } from '../../../../http/index';
import {useDispatch} from 'react-redux';
import { setOtp } from '../../../../store/authSlice'

const Phone = ({onNext}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    async function submit(){
      if(!phoneNumber || phoneNumber.length != 10) {
        alert('Please enter a valid phone number');
        return;
      }
      //server-request
      const {data} = await sendOtp({phone: phoneNumber});
      console.log(data);
      dispatch(setOtp({phone: data.phone, hash: data.hash}));
      onNext();
    }

    return (
      <Card title="Enter you phone number" icon="phone">
          <TextInput
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div>
              <div className={styles.actionButtonWrap}>
                  <Button text="Next" onClick={submit} />
              </div>
              <p className={styles.bottomParagraph}>
                  By entering your number, you’re agreeing to our Terms of
                  Service and Privacy Policy. Thanks!
              </p>
          </div>
      </Card>
  );
};

export default Phone