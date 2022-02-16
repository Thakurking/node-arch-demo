// const processGST = async (channel, gstData) => {
//   console.log("===================:process gst details function:===================");
//   channel.sendToQueue("PROCESS_GST_DATA", Buffer.from(JSON.stringify(gstData)));
// };

// module.exports.processGST = processGST;

const amqp = require("./server");

const axios = require("axios");

amqp.amqpConnect().then(async () => {
  await amqp.channel.consume("PROCESS_GST_DATA", async (data) => {
    const { gstin, username, password } = JSON.parse(data.content);
    amqp.channel.ack(data);
    const respose = await processGST(gstin, username, password);
    amqp.channel.sendToQueue(
      "BUYER_QUEUE",
      Buffer.from(JSON.stringify(respose))
    );
  });
});

async function processGST(gstin, username, password) {
  try {
    const gst = await axios.post(
      "https://api.karza.in/gst/uat/v2/trrn-advance",
      {
        username: username,
        password: password,
        gstin: gstin,
        consent: "Y",
        extendedPeriod: false,
      },
      {
        headers: {
          "content-type": "application/json",
          "x-karza-key": "VEAJO0zaUO0R9Xiu",
        },
      }
    );
    console.log(gst.data);
    return {
      message: gst.data,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error.config,
      status: false,
    };
  }
}
