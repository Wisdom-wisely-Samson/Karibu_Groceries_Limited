

// Procurement Records

let procurements = [
  { id: 1, dealerName: "James", produceType: "Beans", tonnageInKgs: 1200, costInUgx: 6600000, procurementDate: new Date() },
  { id: 2, dealerName: "Alice", produceType: "Maize", tonnageInKgs: 800, costInUgx: 3840000, procurementDate: new Date() },
  { id: 3, dealerName: "James", produceType: "G-nuts", tonnageInKgs: 1500, costInUgx: 10800000, procurementDate: new Date() },
  { id: 4, dealerName: "Brian", produceType: "Soybeans", tonnageInKgs: 2000, costInUgx: 11600000, procurementDate: new Date() },
  { id: 5, dealerName: "Alice", produceType: "Cow peas", tonnageInKgs: 1000, costInUgx: 6000000, procurementDate: new Date() },
  { id: 6, dealerName: "David", produceType: "Beans", tonnageInKgs: 900, costInUgx: 4950000, procurementDate: new Date() }
];

//Map

let withCostPerKg = procurements.map(record => ({
  ...record,
  costPerKg: record.costInUgx / record.tonnageInKgs
}));

//using .filter

let validTonnage = procurements.filter(r => r.tonnageInKgs >= 1000);
console.log(validTonnage);
console.log("Count:", validTonnage.length);

// using .reduce

let totals = procurements.reduce(
  (acc, r) => {
    acc.totalTonnage += r.tonnageInKgs;
    acc.totalCost += r.costInUgx;
    return acc;
  },
  { totalTonnage: 0, totalCost: 0 }
);

console.log(`Total Tonnage: ${totals.totalTonnage}`);
console.log(`Total Cost: ${totals.totalCost}`);

// SETS
 

function getUniqueDealers(records) {
  return [...new Set(records.map(r => r.dealerName))];
}

console.log(getUniqueDealers(procurements));

let authorizedRoles = new Set(['Manager', 'Director']);

function isAuthorizedForProcurement(role) {
  return authorizedRoles.has(role);
}

console.log(isAuthorizedForProcurement("Manager"));
console.log(isAuthorizedForProcurement("Sales Agent"));

//MAPS

let kglPriceList = new Map([
  ['Beans', 5500],
  ['Grain Maize', 4800],
  ['Cow peas', 6000],
  ['G-nuts', 7200],
  ['Soybeans', 5800]
]);

function calculateSaleTotal(produceName, tonnageInKgs) {
  let price = kglPriceList.get(produceName);
  if (!price) return "Price not found";
  return price * tonnageInKgs;
}

// Iterate map
let prices = [];
for (let [name, price] of kglPriceList) {
  console.log(`Produce: ${name}, Price per Kg: ${price} UgX`);
  prices.push(price);
}

let highestPrice = prices.reduce((max, p) => p > max ? p : max, 0);
console.log("Highest price:", highestPrice);
