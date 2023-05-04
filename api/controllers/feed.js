export const getUser = async (req, res, next) => {
  const userId = req.userId;
  res.status(200).json({ userId: userId });
};
export const postAddProduct = async (req, res, next) => {
  const name = req.body.name;
  const image = req.file;
};
