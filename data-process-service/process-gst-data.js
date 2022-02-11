// const processGST = async (channel, gstData) => {
//   console.log("===================:process gst details function:===================");
//   channel.sendToQueue("PROCESS_GST_DATA", Buffer.from(JSON.stringify(gstData)));
// };

// module.exports.processGST = processGST;

const amqp = require("./server")

amqp.amqpConnect().then(async() => {
    amqp.channel.consume("PROCESS_GST_DATA", async(data) => {
        
    })
})