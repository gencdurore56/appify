/*
Filename: ComplexCode.js
Content: A complex JavaScript code demonstrating a simulation of a space battle game.
*/

// Class for creating a spaceship
class Spaceship {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  attack(enemySpaceship) {
    if (Math.random() <= this.accuracy) {
      console.log(`${this.name} hits ${enemySpaceship.name} with ${this.firepower} firepower!`);
      enemySpaceship.hull -= this.firepower;
    } else {
      console.log(`${this.name} missed the shot on ${enemySpaceship.name}.`);
    }
  }

  retreat() {
    console.log(`${this.name} retreats from the battle.`);
  }

  repair() {
    this.hull = 100; // Restores hull to full health
    console.log(`${this.name} has been repaired and is now at full health.`);
  }
}

// Create an array of spaceship objects
const createSpaceships = (numSpaceships) => {
  const spaceships = [];
  for (let i = 0; i < numSpaceships; i++) {
    const name = `Spaceship ${i + 1}`;
    const hull = Math.floor(Math.random() * 4) + 3; // Random hull value between 3 and 6
    const firepower = Math.floor(Math.random() * 3) + 2; // Random firepower value between 2 and 4
    const accuracy = (Math.floor(Math.random() * 3) + 6) / 10; // Random accuracy value between 0.6 and 0.8
    spaceships.push(new Spaceship(name, hull, firepower, accuracy));
  }
  return spaceships;
};

// Simulate a space battle
const simulateBattle = () => {
  const mySpaceships = createSpaceships(6);
  const alienSpaceships = createSpaceships(6);
  let round = 1;

  console.log("=== Space Battle Simulation ===");

  while (mySpaceships.length > 0 && alienSpaceships.length > 0) {
    console.log(`\n=== Round ${round} ===`);

    // Player's turn to attack
    const mySpaceship = mySpaceships[Math.floor(Math.random() * mySpaceships.length)];
    const alienSpaceship = alienSpaceships[Math.floor(Math.random() * alienSpaceships.length)];

    mySpaceship.attack(alienSpaceship);

    if (alienSpaceship.hull <= 0) {
      console.log(`${alienSpaceship.name} has been destroyed!`);
      alienSpaceships.splice(alienSpaceships.indexOf(alienSpaceship), 1);
      if (alienSpaceships.length === 0) {
        console.log("\n===> You won the battle! All alien spaceships have been destroyed!");
        break;
      }
    }

    // Alien's turn to attack
    const randomSpaceshipIndex = Math.floor(Math.random() * mySpaceships.length);
    const randomSpaceship = mySpaceships[randomSpaceshipIndex];

    alienSpaceship.attack(randomSpaceship);

    if (randomSpaceship.hull <= 0) {
      console.log(`${randomSpaceship.name} has been destroyed!`);
      mySpaceships.splice(randomSpaceshipIndex, 1);
      if (mySpaceships.length === 0) {
        console.log("\n===> You lost the battle! All your spaceships have been destroyed!");
        break;
      }
    }

    round++;
  }
};

// Start the space battle simulation
simulateBattle();