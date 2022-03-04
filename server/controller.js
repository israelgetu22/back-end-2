const houses = require("./db.json");
let globalID = 4;

module.exports = {
  getHouses: (req, res) => {
    res.status(200).send(houses);
  },
  createNewHouse: (req, res) => {
    let newHouse = req.body;

    newHouse.id = globalID;

    houses.push(newHouse);

    res.status(200).send(houses);
    globalID++;
  },

  // createNewHouse: (req, res) => {
  //   const { address, price, imageURL } = res.query;
  //   let newHouse = {
  //     address,
  //     price,
  //     imageURL,
  //     id: globalID,
  //   };
  //   houses.push(newHouse);

  //   res.status(200).send(houses);
  //   globalID++;
  // },

  deleteHouse: (req, res) => {
    let index = houses.findIndex((houses) => +houses.id === +req.params.id);
    houses.splice(index, 1);
    res.status(200).send(houses);
  },
  updateHouse: (req, res) => {
    let { id } = req.params;
    let { type } = req.body;
    let index = houses.findIndex((elem) => +elem.id === +id);

    if (houses[index].price <= 10000 && type === "minus") {
      houses[index].price = 0;
      res.status(200).send(houses);
    } else if (type === "plus") {
      houses[index].price += 10000;
      res.status(200).send(houses);
    } else if (type === "minus") {
      houses[index].price -= 10000;
      res.status(200).send(houses);
    } else {
      res.sendStatus(400);
    }
  },
};
