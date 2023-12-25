import react , {FunctionComponent} from "react";
import InfoCard from '../components/InfoCard';
import "../styles/loginPageStyle.css"
import loginPageProps from '../types/loginPageProps';
import {GoogleLogin} from '@react-oauth/google';
import { StyledEngineProvider } from '@mui/material/styles';
//import "../styles/images.css";
import sass from 'sass';

import images from "../types/images";
//import TitlebarBelowImageList from '../types/TitlebarBelowImageList';
import Carousel from "../types/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const LoginPage : React.FC<loginPageProps> = ({handleLoginSuccess}) => {
    return (
        <>
            <div className="page1">
                <div className="firstDiv">
                    <img id = "first_img" src="https://i.ytimg.com/vi/VVNt3cLjX3c/maxresdefault.jpg" alt="" width="100%" />
                    <div className="textt"> <h1>Let's Begin The Journey TOGETHER!!!</h1>
                    
                    
                    <div id="google-one-tap-button">
                    
                        
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
                </div>
                <div className="Topic2">Places you can VISIT</div>
                <Carousel />
                
            </div>
            
        </>
    );
};
export default LoginPage;
