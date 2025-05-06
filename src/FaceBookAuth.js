import React from "react";
import FacebookLogin from "react-facebook-login";

const FacebookAuth = ({ onLoginSuccess }) => {
    const appId = "1337259867161723"; // Replace with your Facebook App ID

    const responseFacebook = (response) => {
        console.log("Facebook Login Response:", response);
        if (response.accessToken) {
            onLoginSuccess(response); // Pass the response to a parent component or handle it here
        } else {
            console.error("Facebook Login failed");
        }
    };

    return (
        <div className="facebook-login">
            <FacebookLogin
                appId={appId}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                textButton="Login with Facebook"
                icon="fa-facebook"
                cssClass="fb-login-button"
            />
        </div>
    );
};

export default FacebookAuth;
