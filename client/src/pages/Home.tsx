import { Container, Typography } from "@mui/material";
import LoginForm from "components/LoginForm";
import { orange } from '@mui/material/colors'
import background from "../books.jpg";
import SignupForm from "components/SignupForm";


const Home = () => {
   return (
      <Container
      className='loginFormContainer'
      maxWidth={false}
      style={{ 
        padding: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: '100px',
        height: '100%',
        position: 'absolute',
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
     }}
    >
     
      {/* <Typography variant='h2' sx={{
        backgroundColor: orange[500],
        color: 'white', 
        padding: '10px',
        borderRadius: '10px',
        opacity: 0.9,
        boxShadow: '0 0 40px rgba(8,7,16,0.9)',
        border: '1px solid rgba(255,255,255,0.9)',
        }}>Library System</Typography> */}
         <LoginForm />
      </Container> 
   ) 
}

export default Home;