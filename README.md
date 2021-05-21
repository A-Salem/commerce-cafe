# commerce-cafe

## Start
- Make sure that you have nodejs and mongoDB installed on your local machine
- Once cloned the project run inside its directory: `npm install`, then `node server.js`

## Usage
- After startup the project will create the database and fill it with the data if it doesn't exist
- Allowed filters:
1. `product_type: ["machine", "pod", "COFFEE_MACHINE_LARGE", "COFFEE_MACHINE_SMALL", "ESPRESSO_MACHINE", "COFFEE_MACHINE_LARGE", "COFFEE_MACHINE_SMALL", "ESPRESSO_MACHINE", "COFFEE_POD_LARGE", "COFFEE_POD_SMALL", "ESPRESSO_POD"]`
2. `water_line: [true, false]`
3. `coffee_flavor: ["COFFEE_FLAVOR_VANILLA", "COFFEE_FLAVOR_CARAMEL", "COFFEE_FLAVOR_PSL", "COFFEE_FLAVOR_MOCHA", "COFFEE_FLAVOR_HAZELNUT"]`
4. `pack_size: ["base", "premium", "deluxe", "1 dozen", "3 dozen", "5 dozen", "7 dozen"]`