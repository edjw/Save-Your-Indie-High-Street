require("dotenv").config();

const Airtable = require("airtable");
Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.AIRTABLE_API_KEY
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

module.exports = async () => {
    let allRecords = [];
    return new Promise((resolve, reject) => {
        base("businesses_table").select({
            // Selecting the first 3 records in Database:
            // maxRecords: 3,
            view: "Database",
            sort: [
                { field: "name", direction: "asc" }
            ],
            // Specifying fields makes it slower/no difference for some reason
            // fields: ["id", "name", "description", "category", "town_city", "website", "phone_number", "email_address", "voucher_instructions", "voucher_link", "delivery_instructions", "delivery_link"]
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function (record) {
                if (record.fields.town_city && record.fields.name) {

                    if (record.fields.town_city.toLowerCase() === "newcastle upon tyne") {
                        record.fields.town_city = "Newcastle";
                    }

                    allRecords.push(record.fields);
                }
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
                // console.log(allRecords);
                resolve(allRecords);
            }
        })
    });
};
