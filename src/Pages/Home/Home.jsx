import React, { useDebugValue } from 'react';
import styles from './Home.module.css';
import {Link, useHistory} from 'react-router-dom';
import Card from '../../Components/Shared/Card/Card';
import Button from '../../Components/Shared/Button/Button';

const Home = () => {
  const singinStyle = {
    color : '#0077FF',
    fontWeight : 'bold',
    textDacoration : 'none',
    marginLeft : '10px'
  }

  const history = useHistory();

  function startRegister(){
    history.push('/authenticate')
  }

  return (
    <div className={styles.cardWrapper}>

      <Card title="Welcome to Talk Over!" icon="logo">
        {/* this all below content passing as a props as children in card component */}
        <p className={styles.text}>
          We’re working hard to get Talkover ready for everyone!
          While we wrap up the finishing touches, we’re adding people
          gradually to make sure nothing breaks
        </p>
        
        <div>
          <Button onClick={startRegister} text="Let's Start"></Button>
        </div>

        <div className={styles.signinWrapper}>
          <span className={styles.invite}>Have an invite text?</span>
          {/* <Link style={singinStyle} to="/login">Sign in</Link> */}
        </div>
      </Card>

    </div>
  )
}

export default Home