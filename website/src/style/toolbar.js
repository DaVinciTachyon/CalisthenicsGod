import styled from 'styled-components';
import { Colours, Transition, Text } from './constants';
import { Link } from 'react-router-dom';

const pixelBarrier = 850;

const SvgGroup = styled.g``;

//fa-primary, fa-secondary
const SvgComponent = styled.path`
  color: ${Text.primary};
  transition: ${Transition.primary};
`;

//fa-primary
const PrimarySvgComponent = styled(SvgComponent)`
  filter: brightness(90%);
`;

const SecondarySvgComponent = styled(SvgComponent)``;

// .nav-link:hover .fa-primary
const LinkPrimarySvgComponent = styled(PrimarySvgComponent)`
  .current & {
    color: ${Text.secondary.alternative};
  }
`;

const LinkSecondarySvgComponent = styled(SecondarySvgComponent)`
  .current & {
    color: ${Text.tertiary.alternative};
  }
`;

// .navbar:hover .logo svg .fa-primary
const LogoPrimarySvgComponent = styled(PrimarySvgComponent)``;

const LogoSecondarySvgComponent = styled(SecondarySvgComponent)``;

//navbar
const NavigationBarContainer = styled.nav`
  position: fixed;
  background: ${Colours.primary.standard};
  transition: width ${Transition.primary} ease;

  &:hover {
    ${LogoSecondarySvgComponent} {
      fill: ${Text.tertiary.standard};
    }
    ${LogoPrimarySvgComponent} {
      fill: ${Text.secondary.standard};
    }
  }

  @media only screen and (max-width: ${pixelBarrier}px) {
    height: 5rem;
    width: 100vw;
    top: 0;
    left: 0;

    ${(props) => (props.isMobile ? `bottom: 0; top: auto;` : '')}
  }
  @media only screen and (min-width: ${pixelBarrier}px) {
    width: 5rem;
    height: 100vh;
    top: 0;
    left: 0;

    &.signedout {
      height: 5rem;
      width: 100vw;
      top: 0;
      left: 0;
    }

    &:hover {
      width: 16rem;
    }
  }
`;

//navbar-nav
const NavigationBar = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  @media only screen and (max-width: ${pixelBarrier}px) {
    flex-direction: row;
  }
`;

//nav-item
const NavigationItem = styled.li`
  width: 100%;

  &:last-child {
    margin-top: auto;
  }

  &:hover {
    ${SecondarySvgComponent} {
      color: ${Text.tertiary.standard};
    }
    ${PrimarySvgComponent} {
      color: ${Text.secondary.standard};
    }
  }

  @media only screen and (max-width: ${pixelBarrier}px) {
    height: 100%;
  }
`;

//nav-link
const NavigationLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 5rem;
  color: ${Text.primary};
  text-decoration: none;
  filter: greyscale(100%) opacity(0.7);
  transition: ${Transition.primary};

  &:hover {
    filter: grayscale(0%) opacity(1);
    background: ${Colours.primary.dark};
  }

  .signedout & {
    height: 5rem;
    width: 100vw;
    display: flex;
    justify-content: center;
  }

  .signedout &:hover {
    background: ${Colours.primary.standard};
    filter: greyscale(0) opacity(0);
  }

  @media only screen and (max-width: ${pixelBarrier}px) {
    justify-content: center;
  }
`;

//nav-link svg
const Svg = styled.svg`
  min-width: 2rem;
  max-width: 2rem;
  margin: 0 1.5rem;
`;

// .logo svg
const LogoSvg = styled(Svg)`
  transform: rotate(0deg);
  transition: transform ${Transition.primary};
  right: 0;

  ${NavigationBarContainer}:hover & {
    transform: rotate(-180deg);
  }
`;

//link-text
const LinkText = styled.span`
  display: none;
  margin-left: 1rem;
  color: ${Text.primary};

  .signedout & {
    display: block;
  }

  @media only screen and (min-width: ${pixelBarrier}px) {
    ${NavigationBarContainer}:hover & {
      display: inline;
      transition: opacity ${Transition.primary};
    }
  }
`;

//logo
const Logo = styled.li`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
  color: ${Text.secondary};
  background: ${Colours.primary.dark};
  font-size: 1.5rem;
  letter-spacing: 0.3ch;
  display: flex;
  justify-content: center;
  width: 100%;

  @media only screen and (max-width: ${pixelBarrier}px) {
    display: none;

    .signedout & {
      display: block;
      background: ${Colours.primary.standard};
    }
  }
`;

// .navbar-sub
const SubNavigationBar = styled.ul`
  display: none;

  @media only screen and (max-width: ${pixelBarrier}px) {
    ${NavigationItem}:hover & {
      display: flex;
      flex-direction: row;
      position: absolute;
      top: 5rem;
      left: 0;
      width: 100vw;
      transition: ${Transition.primary};
      background: ${Colours.primary.standard};
    }
  }
  @media only screen and (min-width: ${pixelBarrier}px) {
    ${NavigationItem}:hover & {
      display: block;
      transition: ${Transition.primary};
    }
  }
`;

// .navbar-sub .nav-link
const SubNavigationLink = styled(NavigationLink)`
  height: 3rem;
`;

const SubNavigationItem = styled(NavigationItem)`
  @media only screen and (max-width: ${pixelBarrier}px) {
    ${NavigationItem}:hover & {
      display: inline-block;
    }
  }
`;

const SubLinkText = styled(LinkText)`
  @media only screen and (max-width: ${pixelBarrier}px) {
    ${NavigationItem}:hover & {
      display: block;
    }
  }
`;

export {
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
};
