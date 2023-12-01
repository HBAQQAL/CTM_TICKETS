var date = new Date();
var formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
const nodeMailer = require('nodemailer');
require('dotenv').config();
const transporter = nodeMailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth : {
        user : process.env.email,
        pass : process.env.password
    }
});

start = () => {
    fetch('https://booking.ctm.ma/api/fr-fr/journeys/search?departureDate=2023-12-01&isPartOfRoundtrip=false&currency=CURRENCY.MAD&fareClasses=BONUS_SCHEME_GROUP.ADULT%2C1&originBusStopId=362&destinationCityId=5611&IsOutbound=true&CheckPaxSoldTogetherRules=true')
        .then(response => response.json())
        .then(data => {
            data.Journeys.forEach(function (journey) {
               // console.log(journey);
                
                if(journey.CampaignPrice != null && journey.CampaignPrice < 150) {
                    sendMail(journey);
                    console.log(journey.CampaignPrice);
                }
            });
        })      
        .catch(error => console.error('Error:', error));
}

async function sendMail(journey) {
    const departureDate = journey.DepartureDateTime;
    const arrivalDate = journey.ArrivalDateTime;
    const originCity = journey.OriginCityName;
    const destinationCity = journey.DestinationCityName;
    const regularPrice = journey.RegularPrice;
    const compaignPrice = journey.CampaignPrice;
    const text = `Departure Date: ${departureDate}\nArrival Date: ${arrivalDate}\nOrigin City: ${originCity}\nDestination City: ${destinationCity}\nRegular Price: ${regularPrice}\nCampaign Price: ${compaignPrice}`; 

    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <hamzabaqqal2002@outlook.com>',
        to: "hamzabaqqal2002@gmail.com,achrafhammi29@gmail.com",
        subject: "ERRACHIDIA TONADI   ✔",
        text: `Departure Date: ${departureDate}\nArrival Date: ${arrivalDate}\nOrigin City: ${originCity}\nDestination City: ${destinationCity}\nRegular Price: ${regularPrice}\nCampaign Price: ${compaignPrice}`,
        html: "<b>"+ text + "</b>",
    });
    console.log("Message sent: %s", info.messageId);
}
start();
setInterval(() => {
    start();
}, 5 * 60 * 1000); // Execute the start method every 5 minutes
