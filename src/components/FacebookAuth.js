import React from "react";
import FacebookLogin from "react-facebook-login";

export default class FacebookAuth extends React.Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
  };

  responseFacebook = (response) => {
    if (response.status !== "unknown") {
      this.setState({
        isLoggedIn: true,
        userID: response.userID,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
      });
    }
  };

  // componentClicked = () => {
  //   console.log("cliked");
  // };

  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      const { name, email, picture } = this.state;

      fbContent = (
        <div>
          <img className="avatar" src={picture} alt={`avatar_${name}`} />
          <div>
            <p>{name}</p>
            <p>{email}</p>
          </div>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="534709177450041"
          fields="name,email,picture"
          // onClick={this.componentClicked}
          callback={this.responseFacebook}
          size="medium"
          textButton="Facebook"
          cookie={true}
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}
