import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { useEffect } from "react";

function App() {
  const [heroes, setHeroes] = useState([
    {
      name: "Drow Ranger",
      life: 80,
      damage: [20, 50],
      menu: 1,
      img: "drow_ranger.png",
    },
    {
      name: "Ember Spirit",
      life: 100,
      damage: [10, 40],
      menu: 1,
      img: "ember_spirit.png",
    },
    {
      name: "Hoodwink",
      life: 120,
      damage: [15, 30],
      menu: 1,
      img: "hoodwink.png",
    },
    {
      name: "Nevermore",
      life: 100,
      damage: [20, 50],
      menu: 2,
      img: "nevermore.png",
    },
    { name: "Puck", life: 80, damage: [30, 60], menu: 2, img: "puck.png" },
    { name: "Pudge", life: 100, damage: [20, 50], menu: 2, img: "pudge.png" },
  ]);
  const [heroOne, setHeroOne] = useState();
  const [heroTwo, setHeroTwo] = useState();
  const [winner, setWinner] = useState();

  const [attackFirst, setAttackFirst] = useState();
  const [fightStarted, setFightStarted] = useState(false);
  const [fightStarted2, setFightStarted2] = useState(true);
  const [currentAttacker, setCurrentAttacker] = useState();
  const [hitsFirst, setHitsFirst] = useState("");
  const [round, setRound] = useState(0);

  function getHeroOne(input) {
    setHeroOne(input);
  }

  function getHeroTwo(input) {
    setHeroTwo(input);
  }

  function startFight() {
    // generate a random number between 0 and 1
    const randomNumber = Math.random();

    // return 0 if random number is less than 0.5, otherwise return 1
    if (randomNumber < 0.5) {
      setCurrentAttacker(0);
      setHitsFirst(`${heroOne?.name} hits first`);
    } else {
      setCurrentAttacker(1);
      setHitsFirst(`${heroTwo?.name} hits first`);
    }
  }

  function hit() {
    setRound((old) => old + 1);
  }

  useEffect(() => {
    if (round > 0) {
      // if current attacker is hero one
      if (currentAttacker === 0) {
        // if hero two is not dead yet
        if (heroTwo?.life > 0) {
          // calculate how much damage hero one will deal
          const [min, max] = heroOne.damage;
          const damage = Math.floor(Math.random() * (max - min + 1) + min);
          console.log("damage", damage);
          const lifeLeft = heroTwo.life - damage;
          setHeroTwo((prevState) => ({
            ...prevState,
            life: lifeLeft,
          }));
          setCurrentAttacker(1);
        }
        // else if hero two is attacking
      } else if (currentAttacker === 1) {
        // if hero one is not dead yet
        if (heroOne?.life > 0) {
          // calculate the damage hero two will do
          const [min, max] = heroTwo.damage;
          const damage = Math.floor(Math.random() * (max - min + 1) + min);
          console.log("damage", damage);
          const lifeLeft = heroOne.life - damage;
          setHeroOne((prevState) => ({
            ...prevState,
            life: lifeLeft,
          }));

          setCurrentAttacker(0);
        }
      }
    }
  }, [round]);

  useEffect(() => {
    if (heroTwo?.life <= 0) {
      setWinner(`${heroOne?.name} wins!`);
    }
    if (heroOne?.life <= 0) {
      setWinner(`${heroTwo?.name} wins!`);
    }
  }, [heroTwo, heroOne]);

  // console.log("currentAttacker", currentAttacker);

  // useEffect(() => {
  //   console.log("fight start");
  //   while (fightStarted2) {
  //     if (currentAttacker === 0) {
  //       if (heroOne.damage > heroTwo.life) {
  //         setFightStarted2(false);
  //         console.log("hero one wins");
  //       } else {
  //         console.log("hero 2 is still alive");
  //         setCurrentAttacker(1);
  //       }
  //     } else if (currentAttacker === 1) {
  //       if (heroTwo.damage > heroOne.life) {
  //         setFightStarted2(false);
  //         console.log("hero two wins");
  //       } else {
  //         console.log("hero 1 is still alive");
  //         setCurrentAttacker(0);
  //       }
  //     }
  //   }
  // }, [fightStarted]);

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
            <h1>{heroOne?.life > 0 && <span>HP: {heroOne?.life}</span>}</h1>
            <h1>{heroOne?.life <= 0 && <span>Dead!</span>}</h1>
          </Col>
          <Col className="details-column">
            {heroOne ? (
              <>
                <span>Details</span>
                <span>Health: {heroOne?.life}</span>{" "}
                <span>Damage: {heroOne?.damage.toString()}</span>{" "}
              </>
            ) : (
              <span>No hero selected</span>
            )}
          </Col>
          <Col align="center" className="buttons-col">
            <span className="hero-name">{heroOne?.name}</span>
            <h1>VS</h1>
            <span className="hero-name">{heroTwo?.name}</span>
            <span>
              <button className="mt-2" onClick={startFight}>
                Draw Straws
              </button>
            </span>
            <span>
              <button className="mt-2" onClick={hit}>
                Hit
              </button>
            </span>
          </Col>
          <Col className="details-column">
            {heroTwo ? (
              <>
                <span>Details</span>
                <span>Health: {heroTwo?.life}</span>{" "}
                <span>Damage: {heroTwo?.damage.toString()}</span>{" "}
              </>
            ) : (
              <span>No hero selected</span>
            )}
          </Col>
          <Col align="center">
            <div>{heroTwo?.name}</div>
            <div>
              <img className="hero-image" src={heroTwo?.img}></img>
            </div>
            <h1>{heroTwo?.life > 0 && <span>HP: {heroTwo?.life}</span>}</h1>
            <h1>{heroTwo?.life <= 0 && <span>Dead!</span>}</h1>
          </Col>
        </Row>
        <Row>
          <Col align="center">
            <h1>{hitsFirst}</h1>
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
