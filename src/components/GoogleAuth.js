import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

export default class GoogleAuth extends React.Component {
  state = {
    isLogeedIn: false,
    googleId: null,
    name: null,
    imageUrl: null,
    email: null,
  };

  responseGoogle = (response) => {
    if (!!response.accessToken) {
      const { email, googleId, imageUrl, name } = response.profileObj;

      this.setState({
        isLogeedIn: true,
        googleId,
        email,
        imageUrl,
        name,
      });
    }
  };

  render() {
    let googleContent;

    if (this.state.isLogeedIn) {
      const { googleId, email, imageUrl, name } = this.state;
      googleContent = (
        <div>
          <img className="avatar" src={imageUrl} alt={googleId} />
          <div>
            <p>{name}</p>
            <p>{email}</p>
          </div>
        </div>
      );
    } else {
      googleContent = (
        <GoogleLogin
          clientId="992550120559-bojikuv1jt0lv8sbapqc697efang8s76.apps.googleusercontent.com"
          buttonText="Google"
          isSignedIn={true}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
          scope="profile email"
        />
      );
    }

    return <div>{googleContent}</div>;
  }
}
