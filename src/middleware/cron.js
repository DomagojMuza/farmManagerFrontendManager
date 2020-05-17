// const CronJob = require('cron').CronJob;
// import {Activity} from '../db/models/activity.js'
// import {mailSender} from '../email/mail'

// var job = new CronJob('00 00 04 * * *', async function() {
//     const noDuplicates = {}
//     const today = new Date()
//     const tomorrow = new Date(today)
//     tomorrow.setDate(tomorrow.getDate() + 1)
//     console.log("tomorow", tomorrow.getDate());
//     const allActivities = await Activity.find({
//         reminder: true,
//         $and: [
//             {scheduledAt: {$gt: today}},
//             {scheduledAt: {$lte: tomorrow}}
//         ]
//     })

//     allActivities.forEach((activity) =>{
//         noDuplicates[activity.ownerEmail] ? noDuplicates[activity.ownerEmail].push(` ${activity.description}`) : noDuplicates[activity.ownerEmail] = [`In the next 24h ${activity.description}`]
//     })
//     for (let [email, activities] of Object.entries(noDuplicates)) {
//         await mailSender(email, activities)
//         console.log(email, activities);
//     }

// });

// job.start();