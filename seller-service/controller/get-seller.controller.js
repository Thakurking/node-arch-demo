exports.getSeller = async (req, res) => {
  return res.json({
    data: {
      name: "Bilaute Ki Billi Singh",
      age: "4",
      email: "catlady@billimail.com",
      phone: "cat_world_123",
      businessName: "Big Black Cat Pvt. Ltd.",
      businessAddress: "2404 W Pioneer Pkwy, Grand Prairie, TX 75051, USA, Cat Universe",
    },
    status: true,
  });
};
