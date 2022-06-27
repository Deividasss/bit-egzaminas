import "./homepage.css";
import logo from "../../assets/img/GoFundMe.jpg";
import logo2 from "../../assets/img/Help.jpg";

export default (props) => {
  return (
    <div className="container">
      <div className="intro-row row clearfix">
        <div className="intro-left col-sm-6">
          <div className="intro-text">
            <h1>A place for You to make a difference</h1>
            <p>
              There’s a part of every one of us that dreams of a better world.
              That spark of inspiration to help a person, fix a neighborhood, or
              even change a nation. At GoFundMe, we believe your inspiration
              should be shared with everyone. Because that is how change
              happens.
            </p>
          </div>
          <div className="intro-buttons">
            <a href="/howitworks" className="ui button primary">
              Discover How everything works
            </a>
          </div>
        </div>
        <div className="intro-right col-sm-6">
          <img className="titlePicture" src={logo} alt="goFundMe" />
        </div>
        <div className="intro-row row">
          <div className="intro-right col-sm-6">
            <img className="titlePicture" src={logo2} alt="goFundMe" />
          </div>
          <div className="intro-left col-sm-6">
            <div className="intro-text">
              <h1>A place for You to get support</h1>
              <p>
                That’s why we make it easy to inspire the world and turn
                compassion into action. By giving people the tools they need to
                capture and share their story far and wide, we have built a
                community of more than 50 million donors and helped organizers
                raise over $5 billion—and we are just getting started.
              </p>
            </div>
            {!props.isLoggedIn && (
              <div className="intro-buttons">
                <a href="/registration" className="ui button primary">
                  Sign-Up!
                </a>
              </div>
            )}
            {props.isLoggedIn && (
              <div className="intro-buttons">
                <a href="/createCrowdFounding" className="ui button primary">
                  Create a Fundraiser!
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
