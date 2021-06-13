import React from 'react';
import { isMobile } from 'react-device-detect';
import {
  NavigationBarContainer,
  NavigationBar,
  NavigationItem,
  NavigationLink,
  LinkPrimarySvgComponent,
  LogoPrimarySvgComponent,
  LinkSecondarySvgComponent,
  LogoSecondarySvgComponent,
  LinkText,
  Svg,
  SvgGroup,
  LogoSvg,
  Logo,
  SubNavigationBar,
  SubNavigationLink,
  SubNavigationItem,
  SubLinkText,
} from '../../style/toolbar';
import { connect } from 'react-redux';
import { logOut } from '../../stateManagement/reducers/auth';

class ToolBar extends React.Component {
  constructor() {
    super();
    this.state = {
      path: window.location.pathname,
    };
  }

  updateUrl = () => {
    this.setState({ path: window.location.pathname });
  };

  render() {
    if (localStorage.getItem('authToken'))
      return (
        <NavigationBarContainer isMobile={isMobile}>
          <NavigationBar onClick={this.updateUrl}>
            <Logo>
              <NavigationLink to="/">
                <LinkText>CGod</LinkText>
                <LogoSvg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fad"
                  data-icon="dumbbell"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <SvgGroup>
                    <LogoSecondarySvgComponent
                      fill="currentColor"
                      d="M32 288H16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h16zm352-64H256v64h128zm240 0h-16v64h16a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"
                    />
                    <LogoPrimarySvgComponent
                      fill="currentColor"
                      d="M232 32h-48a23.94 23.94 0 0 0-24 24v400a23.94 23.94 0 0 0 24 24h48a23.94 23.94 0 0 0 24-24V56a23.94 23.94 0 0 0-24-24zm224 0h-48a23.94 23.94 0 0 0-24 24v400a23.94 23.94 0 0 0 24 24h48a23.94 23.94 0 0 0 24-24V56a23.94 23.94 0 0 0-24-24zm128 64h-48a23.94 23.94 0 0 0-24 24v272a23.94 23.94 0 0 0 24 24h48a23.94 23.94 0 0 0 24-24V120a23.94 23.94 0 0 0-24-24zm-480 0H56a23.94 23.94 0 0 0-24 24v272a23.94 23.94 0 0 0 24 24h48a23.94 23.94 0 0 0 24-24V120a23.94 23.94 0 0 0-24-24z"
                    />
                  </SvgGroup>
                </LogoSvg>
              </NavigationLink>
            </Logo>
            <NavigationItem
              className={
                this.state.path === '/' ||
                this.state.path.includes('/nutrientTracker')
                  ? 'current'
                  : ''
              }
            >
              <NavigationLink to="/nutrientTracker">
                <Svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fad"
                  data-icon="utensils-alt"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <SvgGroup>
                    <LinkSecondarySvgComponent
                      fill="currentColor"
                      d="M74.8 424a32 32 0 0 0-1.4 46.6l32 32a32 32 0 0 0 46.6-1.4l117.5-132.7-56.6-66.8zM546.5 94.82L452.7 176c-1.5 1.4-5.9-3-4.6-4.6l78.8-96.9c12.4-15.3-10.4-37.8-25.5-25.5l-96.9 78.8c-1.7 1.4-6-3.1-4.7-4.6L481 29.42c12.8-14.7-8.7-38-24.8-26.2-3.9 2.8-76.9 54.5-98.7 76.2-33.3 33.3-37.5 72.1-16.1 108.4-30.4 26.9-19.6 17.4-48.4 42.9l54 50.1c26.5-30 14.4-16.2 41-46.3 35 20.7 74.3 18.1 108.5-16.2 21.7-21.7 73.4-94.6 76.2-98.6 11.8-16.2-11.5-37.6-26.2-24.9z"
                    />
                    <LinkPrimarySvgComponent
                      fill="currentColor"
                      d="M501.7 424.42a32 32 0 0 1 .8 46.1l-32 32a32.09 32.09 0 0 1-46-.7C405.4 479.22 223.9 265.32 216 256 56 256 0 165.92 0 32.12c0-27.9 33.3-42.5 53.8-23.5z"
                    />
                  </SvgGroup>
                </Svg>
                <LinkText>Nutrients</LinkText>
              </NavigationLink>
              <SubNavigationBar>
                <SubNavigationItem>
                  <SubNavigationLink to="/nutrientTracker/ingredients">
                    <SubLinkText>Ingredients</SubLinkText>
                  </SubNavigationLink>
                </SubNavigationItem>
                <SubNavigationItem>
                  <SubNavigationLink to="/nutrientTracker/meals">
                    <SubLinkText>Meals</SubLinkText>
                  </SubNavigationLink>
                </SubNavigationItem>
              </SubNavigationBar>
            </NavigationItem>
            <NavigationItem
              className={
                this.state.path.includes('/workoutTracker') ? 'current' : ''
              }
            >
              <NavigationLink to="/workoutTracker">
                <Svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fad"
                  data-icon="running"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 416 512"
                >
                  <SvgGroup>
                    <LinkSecondarySvgComponent
                      fill="currentColor"
                      d="M272 96a48 48 0 1 1 48-48 48 48 0 0 1-48 48z"
                    />
                    <LinkPrimarySvgComponent
                      fill="currentColor"
                      d="M384 223.81h-44l-26.06-53.2c-12.5-25.53-35.45-44.2-61.78-50.9l-71.11-21.13a95.65 95.65 0 0 0-80.84 17.12l-39.67 30.39A32 32 0 1 0 99.3 197l.18-.13 39.69-30.39c7.67-5.88 17.44-8 25.27-6.13l14.7 4.36L141.68 252A64.09 64.09 0 0 0 168 332.23l85 50.13L225.53 470a32 32 0 0 0 60.79 20c.1-.3.19-.6.28-.9l31.6-101a48.15 48.15 0 0 0-21.64-54.35l-61.24-36.11 31.31-78.21 20.27 41.39a48.31 48.31 0 0 0 43.1 26.94h54a32 32 0 1 0 0-63.95zm-270.31 93.4l-14.8 34.5H32a32 32 0 1 0 0 63.94h77.45a47.88 47.88 0 0 0 44.11-29.06l8.79-20.5-10.67-6.3a95.23 95.23 0 0 1-38-42.58z"
                    />
                  </SvgGroup>
                </Svg>
                <LinkText>Workouts</LinkText>
              </NavigationLink>
              <SubNavigationBar>
                <SubNavigationItem>
                  <SubNavigationLink to="/workoutTracker/exercises">
                    <SubLinkText>Exercises</SubLinkText>
                  </SubNavigationLink>
                </SubNavigationItem>
                <SubNavigationItem>
                  <SubNavigationLink to="/workoutTracker/stages">
                    <SubLinkText>Stages</SubLinkText>
                  </SubNavigationLink>
                </SubNavigationItem>
              </SubNavigationBar>
            </NavigationItem>
            <NavigationItem
              className={
                this.state.path.includes('/measurementTracker') ? 'current' : ''
              }
            >
              <NavigationLink to="/measurementTracker">
                <Svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fad"
                  data-icon="ruler"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <SvgGroup>
                    <LinkSecondarySvgComponent
                      fill="currentColor"
                      d="M624.16 210l-496.8 281.9a32.18 32.18 0 0 1-43.5-11.5L4.26 344.77A31.1 31.1 0 0 1 16 302l69-39.1 59.7 101.4a8 8 0 0 0 10.9 2.9l13.8-7.8a7.78 7.78 0 0 0 2.9-10.7l-59.6-101.52 55.19-31.32 27.81 47.34a8 8 0 0 0 10.9 2.9l13.8-7.8a7.76 7.76 0 0 0 2.9-10.7l-27.93-47.4 55.19-31.31 59.7 101.68a8 8 0 0 0 10.9 2.9l13.8-7.8a7.78 7.78 0 0 0 2.9-10.7l-59.8-101.68 55.2-31.29 27.9 47.3a8 8 0 0 0 10.9 2.9l13.8-7.8a7.76 7.76 0 0 0 2.9-10.7l-27.89-47.38L416.06 75l59.7 101.59a8 8 0 0 0 10.9 2.9l13.8-7.8a7.76 7.76 0 0 0 2.9-10.7L443.68 59.31l69-39.14a32.18 32.18 0 0 1 43.5 11.5l79.6 135.5A31 31 0 0 1 624.16 210z"
                    />
                    <LinkPrimarySvgComponent
                      fill="currentColor"
                      d="M112.66 247.15L85 262.87l59.7 101.4a8 8 0 0 0 10.9 2.9l13.8-7.8a7.78 7.78 0 0 0 2.9-10.7zm165.4-93.88l-27.5 15.61 59.7 101.69a8 8 0 0 0 10.9 2.9l13.8-7.8a7.78 7.78 0 0 0 2.9-10.7zm-82.69 46.93l-27.52 15.63 27.81 47.34a8 8 0 0 0 10.9 2.9l13.8-7.8a7.76 7.76 0 0 0 2.9-10.7zm308-39.23l-59.7-101.7L416.06 75l59.7 101.6a8 8 0 0 0 10.9 2.9l13.8-7.8a7.76 7.76 0 0 0 2.9-10.7zm-142.5-54.7L333.26 122l27.9 47.3a8 8 0 0 0 10.9 2.9l13.8-7.8a7.76 7.76 0 0 0 2.9-10.7z"
                      className="fa-primary"
                    />
                  </SvgGroup>
                </Svg>
                <LinkText>Measurements</LinkText>
              </NavigationLink>
            </NavigationItem>
            <NavigationItem
              className={
                this.state.path.includes('/userProfile') ? 'current' : ''
              }
            >
              <NavigationLink to="/userProfile">
                <Svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fad"
                  data-icon="user"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <SvgGroup>
                    <LinkSecondarySvgComponent
                      fill="currentColor"
                      d="M352 128A128 128 0 1 1 224 0a128 128 0 0 1 128 128z"
                    />
                    <LinkPrimarySvgComponent
                      fill="currentColor"
                      d="M313.6 288h-16.7a174.1 174.1 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48v-41.6A134.43 134.43 0 0 0 313.6 288z"
                    />
                  </SvgGroup>
                </Svg>
                <LinkText>Profile</LinkText>
              </NavigationLink>
            </NavigationItem>
            <NavigationItem>
              <NavigationLink to="/" onClick={this.props.logOut}>
                <Svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fad"
                  data-icon="sign-out-alt"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <SvgGroup>
                    <LinkSecondarySvgComponent
                      fill="currentColor"
                      d="M64 160v192a32 32 0 0 0 32 32h84a12 12 0 0 1 12 12v40a12 12 0 0 1-12 12H96a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96h84a12 12 0 0 1 12 12v40a12 12 0 0 1-12 12H96a32 32 0 0 0-32 32z"
                    />
                    <LinkPrimarySvgComponent
                      fill="currentColor"
                      d="M288 424v-96H152a23.94 23.94 0 0 1-24-24v-96a23.94 23.94 0 0 1 24-24h136V88c0-21.4 25.9-32 41-17l168 168a24.2 24.2 0 0 1 0 34L329 441c-15 15-41 4.52-41-17z"
                    />
                  </SvgGroup>
                </Svg>
                <LinkText>Sign Out</LinkText>
              </NavigationLink>
            </NavigationItem>
          </NavigationBar>
        </NavigationBarContainer>
      );
    document.querySelector('body').style.padding = '5rem 0 0 0';
    return (
      <NavigationBarContainer isMobile={isMobile} className="signedout">
        <NavigationBar>
          <Logo>
            <NavigationLink to="/login">
              <LinkText>CGod</LinkText>
              <LogoSvg
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="dumbbell"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <SvgGroup>
                  <LogoSecondarySvgComponent
                    fill="currentColor"
                    d="M32 288H16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h16zm352-64H256v64h128zm240 0h-16v64h16a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"
                  />
                  <LogoPrimarySvgComponent
                    fill="currentColor"
                    d="M232 32h-48a23.94 23.94 0 0 0-24 24v400a23.94 23.94 0 0 0 24 24h48a23.94 23.94 0 0 0 24-24V56a23.94 23.94 0 0 0-24-24zm224 0h-48a23.94 23.94 0 0 0-24 24v400a23.94 23.94 0 0 0 24 24h48a23.94 23.94 0 0 0 24-24V56a23.94 23.94 0 0 0-24-24zm128 64h-48a23.94 23.94 0 0 0-24 24v272a23.94 23.94 0 0 0 24 24h48a23.94 23.94 0 0 0 24-24V120a23.94 23.94 0 0 0-24-24zm-480 0H56a23.94 23.94 0 0 0-24 24v272a23.94 23.94 0 0 0 24 24h48a23.94 23.94 0 0 0 24-24V120a23.94 23.94 0 0 0-24-24z"
                  />
                </SvgGroup>
              </LogoSvg>
            </NavigationLink>
          </Logo>
        </NavigationBar>
      </NavigationBarContainer>
    );
  }
}

export default connect(() => ({}), {
  logOut,
})(ToolBar);
