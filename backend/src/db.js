import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/nova_soc")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));
