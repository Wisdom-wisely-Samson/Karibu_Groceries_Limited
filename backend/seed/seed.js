const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()
const User = require("../models/user")
const Produce = require("../models/Produce")
const Sale = require("../models/Sale")
const CreditSale = require("../models/creditsale")
const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI)

async function seed() {

  try {

    await User.deleteMany()
    await Produce.deleteMany()
    await Sale.deleteMany()
    await CreditSale.deleteMany()

    console.log("Old data cleared")

    // USERS
    const passwordHash = await bcrypt.hash("orbankaribu2026", 10)
    const users = await User.insertMany([
      {
        username: "Orban",
        email: "orban@karibu.com",
        password: passwordHash,
        role: "Director"
      },
    ])

    console.log("Users seeded")

    // PRODUCE
    const produce = await Produce.insertMany([
      {
        name: "Beans",
        tonnage: 5000,
        cost: 2000000,
        branch: "Maganjo"
      },
      {
        name: "Maize",
        tonnage: 3000,
        cost: 1200000,
        branch: "Matugga"
      }
    ])

    console.log("Produce seeded")

    // SALES
    await Sale.insertMany([
      {
        buyerName: "John",
        produce: "Beans",
        tonnageSold: 200,
        amountPaid: 400000,
        branch: "Maganjo"
      },
      {
        buyerName: "Peter",
        produce: "Maize",
        tonnageSold: 100,
        amountPaid: 200000,
        branch: "Matugga"
      }
    ])

    console.log("Sales seeded")

    // CREDIT SALES
    await CreditSale.insertMany([
      {
        buyerName: "Samuel",
        produce: "Beans",
        tonnageSold: 150,
        amountDue: 300000,
        branch: "Maganjo"
      }
    ])

    console.log("Credit sales seeded")

    console.log("Database seeding complete")

    mongoose.connection.close()

  } catch (error) {

    console.error(error)

  }

}

seed()
