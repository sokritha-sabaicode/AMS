const saveDoc = async (Model, data) => {
  try {
    const newData = new Model(data);
    const result = await newData.save();

    return result._doc;
  } catch (err) {
    throw err;
  }
};

const updateDocById = async (Model, id, newData) => {
  try {
    const result = await Model.findByIdAndUpdate(id, newData, { new: true });

    return result;
  } catch (err) {
    throw err;
  }
};

const getAllDocs = async (Model, page = 1, limit = 10, query = {}) => {
  try {
    const startIndex = (page - 1) * limit;
    const total = await Model.countDocuments(query);

    const docs = await Model.find(query).skip(startIndex).limit(limit);

    return {
      total,
      currentPage: page,
      pages: Math.ceil(total / limit),
      [Model.modelName.toLowerCase()]: docs,
    };
  } catch (err) {
    throw err;
  }
};

const getDocById = async (Model, id) => {
  try {
    const doc = await Model.findById(id);
    return doc;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  saveDoc,
  updateDocById,
  getAllDocs,
  getDocById,
};
