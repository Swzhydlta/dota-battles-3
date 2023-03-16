import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { useEffect } from "react";

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
  const [winner, setWinner] = useState();

  const [attackFirst, setAttackFirst] = useState();
  const [fightStarted, setFightStarted] = useState(false);
  const [currentAttacker, setCurrentAttacker] = useState();

  function startFight() {
    // generate a random number between 0 and 1
    let randomNumber = Math.random();

    // return 0 if random number is less than 0.5, otherwise return 1
    if (randomNumber < 0.5) {
      setCurrentAttacker(0);
    } else {
      setCurrentAttacker(1);
    }

    setFightStarted(true);
  }

  // call the function to generate a random number

  function getHeroOne(input) {
    setHeroOne(input);
  }
  function getHeroTwo(input) {
    setHeroTwo(input);
  }
  console.log("heroOne", heroOne);
  console.log("heroTwo", heroTwo);

  /*  function fight() {
    startFight();
    if (attackFirst === 0) {
      console.log("hero one starts");
    } else {
      console.log("hero 2starts");
    }
  } */

  useEffect(() => {
    console.log("fight start");
    while (fightStarted) {
      if (currentAttacker === 0) {
        if (heroOne.damage > heroTwo.life) {
          setFightStarted(false);
          console.log("hero one wins");
        } else {
          console.log("hero 2 is still alive");
          setCurrentAttacker(1);
        }
      } else if (currentAttacker === 1) {
        if (heroTwo.damage > heroOne.life) {
          setFightStarted(false);
          console.log("hero two wins");
        } else {
          console.log("hero 1 is still alive");
          setCurrentAttacker(0);
        }
      }
    }
  }, [fightStarted]);

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
          <Col className="details-column">
            {heroOne ? (
              <>
                <span>Details</span>
                <span>Health: {heroOne?.life}</span>{" "}
                <span>Damage: {heroOne?.damage}</span> <span>Attribute</span>
              </>
            ) : (
              <span>No hero selected</span>
            )}
          </Col>
          <Col align="center">
            <h1>VS</h1>
          </Col>
          <Col className="details-column">
            {heroTwo ? (
              <>
                <span>Details</span>
                <span>Health: {heroTwo?.life}</span>{" "}
                <span>Damage: {heroTwo?.damage}</span> <span>Attribute</span>
              </>
            ) : (
              <span>No hero selected</span>
            )}
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
            <button onClick={startFight}>Fight</button>
          </Col>
        </Row>
        <Row>
          <Col align="center">
            <h1>{winner ? winner : ""}</h1>
            {/* james comment */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
