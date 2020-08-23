const mongoose = require('mongoose');

exports.connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected(${connection.connection.host})`);
  } catch (e) {
    console.log(`Failed to connect to database ${process.env.MONGO_URI}`);
    process.exit(0);
  }
};
