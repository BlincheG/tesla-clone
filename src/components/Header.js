import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { selectCars } from '../features/car/carSlice'
import { useSelector } from 'react-redux'

export default function Header() {
  const [ burgerStatus, setBurgerStatus ] = useState(false);
  const cars = useSelector(selectCars)

  useEffect(() => {
    let url = window.location.href.split("/");
    let target = url[url.length - 1].toLowerCase();
    let element = document.getElementById(target);
    element && element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollIntoPage = (e, nameCar) => {
    let hero = document.getElementById(nameCar);
    e.preventDefault();
    hero && hero.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Container>
      <a>
        <img src="images/logo.svg" />
      </a>

      <Menu>
        {cars && cars.map((car, index) => (
          <a onClick={(e) => {scrollIntoPage(e, car)}} key={index} href={index}>{ car }</a> 
        ))}

      </Menu>

      <RightMenu>
        <a href="#">Shop</a>
        <a href="#">Tesla Account</a>
        <CustomMenu onClick={() => {setBurgerStatus(true)} }  />
      </RightMenu>

      <BurgerNav show={burgerStatus}>
        <CloseWrapper>
          <CustomClose onClick={() => {setBurgerStatus(false); console.log('123')} } />
        </CloseWrapper>
        {cars && cars.map((car, index) => (
          <li onClick={(e) => {scrollIntoPage(e, car)}} key={index}><a href={index}>{ car }</a></li>
        ))}
        <li><a href="#">Existing Inventory</a></li>
        <li><a href="#">Used Inventory</a></li>
        <li><a href="#">Trade-In</a></li>
        <li><a href="#">Cybertruck</a></li>
        <li><a href="#">Roadaster</a></li>
      </BurgerNav>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 60px;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  a {
    font-weight: 600;
    text-transform: uppercase;
    padding: 0 10px;
    flex-wrap: nowrap;
  }

  @media(max-width: 768px) {
    display: none;
  }
`

const RightMenu = styled.div`
  a {
    font-weight: 600;
    text-transform: uppercase;
    margin-right: 10px;
  }
`

const CustomMenu = styled(MenuIcon)`
  cursor: pointer;
`

const CustomClose = styled(CloseIcon)`

`

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const BurgerNav = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  width: 300px;
  z-index: 100;
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: start;
  transform: ${props => props.show ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.2s ease;

  li {
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .2);

    a {
      font-weight: bold;
    }
  }
`