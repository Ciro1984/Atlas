import mongoose, {mongo} from "mongoose";

async function conectaNaDatabase(){
mongoose.connect("mongodb+srv://admin:cvbn7410@cluster0.5ivyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
return mongoose.connection;
}

export default conectaNaDatabase;