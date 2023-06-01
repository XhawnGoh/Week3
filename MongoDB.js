const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://admin:Gjx990223.@cluster0.oj93cqc.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  const databaseList = await client.db().admin().listDatabases();
  databaseList.databases.forEach(db => console.log(` - ${db.name}`));

  
//   const result =await client.db("sample_Restaurant").collection("restaurants").insertOne(GanWoCao);
// console.log(`New GanWoCao created with the following id: ${result.insertedId}`);


    
    //find 1 个document 有client 包含 infinite views
    //await findOneListingByName(client, "Infinite Views");

    //find 多个
    /*client.db("sample_airbnb").collection("listingsAndReviews").find(
        {
            bedrooms: { $gte: minimumNumberOfBedrooms },
            bathrooms: { $gte: minimumNumberOfBathrooms }
        }
    );*/


    //Create 1 个document
    //await createListing(client,document2);

    //create 多个 document
    /*await createMultipleListings(client, [
        {
            name: "Infinite Views",
            summary: "Modern home with infinite views from the infinity pool",
            property_type: "House",
            bedrooms: 5,
            bathrooms: 4.5,
            beds: 5
        },
        {
            name: "Private room in London",
            property_type: "Apartment",
            bedrooms: 1,
            bathroom: 1
        },
        {
            name: "Beautiful Beach House",
            summary: "Enjoy relaxed beach living in this house with a private beach",
            bedrooms: 4,
            bathrooms: 2.5,
            beds: 7,
            last_review: new Date()
        }
    ]);*/
    
  // the following code examples can be pasted here...

  return 'done.';
}



main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());


//下面都是function来的

async function createListing(client, newListing){
    const result = await client.db("PassYear").collection("NEW Collection").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

const GanWoCao={
    "_id": "xiangbudaoba",
    "listing_url": "nicaicai",
}

const document2={
    "_id": "10057447",
    "listing_url": "https://www.airbnb.com/rooms/10057447",
    "name": "Modern Spacious 1 Bedroom Loft",
    "summary": "Prime location, amazing lighting and no annoying neighbours.  Good place to rent if you want a relaxing time in Montreal.",
    "property_type": "Apartment",
    "bedrooms": {"$numberInt":"1"},
    "bathrooms": {"$numberDecimal":"1.0"},
    "amenities": ["Internet","Wifi","Kitchen","Heating","Family/kid friendly","Washer","Dryer","Smoke detector","First aid kit","Safety card","Fire extinguisher","Essentials","Shampoo","24-hour check-in","Hangers","Iron","Laptop friendly workspace"],
 }

 async function createMultipleListings(client, newListings){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);       
}


async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

