export const getUser = async (req, res, next) => {
  const userId = req.userId;
  res.status(200).json({ userId: userId });
};
