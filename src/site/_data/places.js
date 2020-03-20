require("dotenv").config();

const Airtable = require("airtable");
Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.AIRTABLE_API_KEY
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

module.exports = async () => {
    let allPlaces = [];
    return new Promise((resolve, reject) => {
        base("businesses_table").select({
            // Selecting the first 3 records in Database:
            // maxRecords: 3,
            view: "Database",
            sort: [
                {field: "town_city", direction: "asc"},
            ],
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function (record) {
                allPlaces.push(record.fields.town_city);
            });
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();


        }, function done(err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const uniquePlaces = Array.from(new Set(allPlaces));
                // console.log(allPlaces);
                // console.log(uniquePlaces);
                resolve(uniquePlaces);
            }
        })
    });
};
