import type { NextPage } from 'next'

import { GetServerSideProps } from 'next'
import axios from 'axios'

import { useAuth } from '../contexts/AuthContext.';

import styles from '../styles/Home.module.css'




const Home: NextPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className={styles.container}>
      {user ? (
        <h1>{user.email}</h1>
      ) : (
        <h1>Not signed in</h1>
      )}

    </div>


  )
};




export default Home
