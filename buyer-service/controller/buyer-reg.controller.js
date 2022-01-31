exports.buyerRegistration = async (req, res) => {
  const { name, email, phone } = req.body;
  return res.json({ data: { name, email, phone }, status: true });
};
