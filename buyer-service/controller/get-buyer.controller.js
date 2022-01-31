exports.getBuyers = async (req, res) => {
  return res.json({
    data: {
      name: "billi thakur",
      age: "5",
      email: "billiWaliThakur@billimail.com",
      phone: "cat_world_7837",
      businessName: "Cats auto parts Pvt. Ltd",
      businessAddress:
        "1 Chome-1-3080-2 Mihara, Otawara, Tochigi 324-0047, Japan, Cat Universe",
    },
    status: true,
  });
};
