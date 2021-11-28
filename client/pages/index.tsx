import type { NextPage } from 'next'

import { GetServerSideProps } from 'next'
import axios from 'axios'

import { useAuth } from '../contexts/AuthContext.';

import styles from '../styles/Home.module.css'




const Home: NextPage = ({ user }) => {

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



export const getServerSideProps: GetServerSideProps = async (ctx) => {

  try {
    const response = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
      headers: ctx.req.headers
    })

    return {
      props: response.data
    };
  } catch (error: any) {
    return { props: { errors: error.message } }
  }

};


export default Home
