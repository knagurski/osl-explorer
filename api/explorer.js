const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: { type: String },
  repository: { type: String, default: "npm", index: true },
  downloads: { type: Number, default: 0 },
  author: { type: String, index: true },
  homepage: { type: String },
  color: { type: String },
  iconUrl: { type: String },
});

const Library = mongoose.model("Library", librarySchema);

mongoose.connect(process.env.MONGO_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.getLibraryById = (_id) => Library.findById(_id).exec();

exports.getLibraries = () =>
  Library.find({}).collation({ locale: "en" }).sort("name").exec();

exports.createLibrary = (libraryData) => {
  const library = new Library(libraryData);
  return library.save();
};

exports.updateLibrary = (_id, updatedData) =>
  Library.findByIdAndUpdate(_id, updatedData).exec();

exports.deleteLibrary = (_id) => Library.findByIdAndDelete(_id).exec();
