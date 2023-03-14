import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Dropdown } from "react-bootstrap";

function App() {
  const [heroes, setHeroes] = useState([
    {
      name: "Drow Ranger",
      life: 100,
      damage: 150,
      menu: 1,
      img: "drow_ranger.png",
    },
    {
      name: "Ember Spirit",
      life: 100,
      damage: 80,
      menu: 1,
      img: "ember_spirit.png",
    },
    { name: "Hoodwink", life: 100, damage: 150, menu: 1, img: "hoodwink.png" },
    { name: "Nevermore", life: 100, damage: 80, menu: 2, img: "nevermore.png" },
    { name: "Puck", life: 100, damage: 150, menu: 2, img: "puck.png" },
    { name: "Pudge", life: 100, damage: 80, menu: 2, img: "pudge.png" },
  ]);
  const [heroOne, setHeroOne] = useState();
  const [heroTwo, setHeroTwo] = useState();
  const [winner, setWinner] = useState("");

  function getHeroOne(input) {
    setHeroOne(input);
  }
  function getHeroTwo(input) {
    setHeroTwo(input);
  }
  console.log("heroOne", heroOne);
  console.log("heroTwo", heroTwo);

  function fight() {
    if (heroOne.life < heroTwo.damage) {
      setWinner(`${heroTwo.name} wins`);
    } else {
      setWinner(`${heroOne.name} wins`);
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <h1>Hero Fights</h1>
        </Row>
        <Row>
          <h3>Console needs to be open (outcomes aren't shown on the page)</h3>
        </Row>
        <Row>
          <p>
            So, the site matches up heroes and logs the winner by 1: straight
            damage vs damage and 2: damage vs hp (which at the moment only goes
            hero 1 dmg vs hero 2 hp, not both ways). need to add a message that
            logs 'select a hero' when either hero is undefined. For the time
            being ember and sf are selected by default
          </p>
        </Row>
        <Row>
          <Col>{/* <img src="drow_ranger.png"></img> */}</Col>
          <Col lg={8}>
            <Row>
              <Col align="center">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Hero One
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setHeroOne(null)}>
                      None
                    </Dropdown.Item>
                    {heroes.map(
                      (hero, index) =>
                        hero.menu === 1 && (
                          <Dropdown.Item
                            key={index}
                            href="#/action-1"
                            onClick={() => getHeroOne(hero)}
                          >
                            {hero.name}
                          </Dropdown.Item>
                        )
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              <Col align="center">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Hero Two
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setHeroTwo(null)}>
                      None
                    </Dropdown.Item>
                    {heroes.map(
                      (hero, index) =>
                        hero.menu === 2 && (
                          <Dropdown.Item
                            key={index}
                            href="#/action-1"
                            onClick={() => getHeroTwo(hero)}
                          >
                            {hero.name}
                          </Dropdown.Item>
                        )
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
        <Row className="hero-display">
          <Col align="center">
            <div>{heroOne?.name}</div>
            <div>
              <img className="hero-image" src={heroOne?.img}></img>
            </div>
          </Col>
          <Col align="center">
            <h1>VS</h1>
          </Col>
          <Col align="center">
            <div>{heroTwo?.name}</div>
            <div>
              {" "}
              <img className="hero-image" src={heroTwo?.img}></img>
            </div>
          </Col>
        </Row>
        <Row>
          <Col align="center">
            <button onClick={fight}>Fight</button>
          </Col>
        </Row>
        <Row>
          <Col align="center">
            <h1>{winner ? winner : ""}</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
