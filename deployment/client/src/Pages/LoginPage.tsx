import InfoCard from '../components/InfoCard';
import "../styles/loginPageStyle.css"
import loginPageProps from '../types/loginPageProps';
import {GoogleLogin} from '@react-oauth/google';
import TitlebarBelowImageList from './Demo';
//import { StyledEngineProvider } from '@mui/material/styles';

//import Demo from './Demo';
const LoginPage : React.FC<loginPageProps> = ({handleLoginSuccess}) => {
    return (
        <>
            <div>
                <div id="google-one-tap-button">
                    <InfoCard content="Hello there, please login to continue"/>
                    <h1>YOUR NEXT TRIP STARTS HERE</h1>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            handleLoginSuccess(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                            window.alert('Login Failed. Please retry.');
                        }}

                        useOneTap={true}
                        prompt_parent_id='google-one-tap-button'
                        cancel_on_tap_outside={false}
                        theme='filled_black'
                        size='large'
                        shape='pill'
                        width='250px'
                    />
                </div>
            </div>
        </>
    );
};



export default LoginPage;