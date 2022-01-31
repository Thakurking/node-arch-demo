exports.sellerRegistration = async (req, res) => {
  const { name, email, phone } = req.body;
  console.log(name, email, phone);
  return res.json({ data: { name, email, phone }, status: true });
};
