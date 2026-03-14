const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("../backend/models/User");
const Produce = require("../backend/models/Produce");
const Sale = require("../backend/models/Sale");
const CreditSale = require("../backend/models/creditsale");
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

async function seed() {
  try {
    await User.deleteMany();
    await Produce.deleteMany();
    await Sale.deleteMany();
    await CreditSale.deleteMany();

    console.log("Old data cleared");

    // USERS
    const passwordHash = await bcrypt.hash("orbankaribu2026", 10);
    const users = await User.insertMany([
      {
        username: "Orban",
        email: "orban@karibu",
        password: passwordHash,
        role: "Director",
        branch: "All branches",
      },
    ]);

    console.log("Users seeded");

    // PRODUCE
    const produce = await Produce.insertMany([
      {
        name: "Beans",
        type: "Yellow",
        tonnage: 5000,
        sellingPrice: 5000,
        cost: 2000000,
        dealerName: "Wisdom",
        contact: "0775654433",
        branch: "Maganjo",
        date: 7 / 3 / 2026,
      },
      {
        name: "Maize",
        type: "Yellow",
        tonnage: 5000,
        sellingPrice: 5000,
        cost: 2000000,
        dealerName: "Wisdom",
        contact: "0775654433",
        branch: "Matugga",
        date: 7 / 3 / 2026,
      },
    ]);

    console.log("Produce seeded");

    // SALES
    await Sale.insertMany([
      {
        buyerName: "John",
        produce: "Beans",
        tonnageSold: 200,
        amountPaid: 400000,
        agentName: "Wisdoms",
        branch: "Maganjo",
        date: 7 / 3 / 2026,
      },
      {
        buyerName: "John",
        produce: "Beans",
        tonnageSold: 200,
        amountPaid: 400000,
        agentName: "Wisdoms",
        branch: "Matugga",
        date: 7 / 3 / 2026,
      },
    ]);

    console.log("Sales seeded");

    // CREDIT SALES
    await CreditSale.insertMany([
      {
        buyerName: "Samuel",
        nationalId: "e7h6gbde45be9",
        location: "Bweyale",
        contact: "0746544445",
        amountPaid: 200000,
        produce: "Beans",
        tonnage: 150,
        amountDue: 300000,
        dueDate: 21 / 3 / 2026,
        branch: "Maganjo",
        date: 7 / 3 / 2026,
        status: "Pending",
        agentName: "Wisdoms",
      },
      {
        buyerName: "Samuel",
        nationalId: "e7h6gbde45be9",
        location: "Bweyale",
        contact: "0788766553",
        amountPaid: 200000,
        produce: "Beans",
        tonnage: 150,
        amountDue: 300000,
        dueDate: 21 / 3 / 2026,
        branch: "Matugga",
        date: 7 / 3 / 2026,
        status: "Pending",
        agentName: "Wisdoms",
      },
    ]);

    console.log("Credit sales seeded");

    console.log("Database seeding complete");

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
}

seed();
