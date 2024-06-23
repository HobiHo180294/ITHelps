import mongoose from 'mongoose';

let isConnected: boolean = false;

export const establishDBConnection = async () => {
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URL) {
		return console.log('Missing MONGODB_URL');
	}
	if (isConnected) {
		return console.log('Mongodb is already connected');
	}

	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			dbName: 'ITHelps',
		});
		isConnected = true;
		console.log('Mongodb is  connected');
	} catch (error) {
		console.log('MongoDB connection failed', error);
	}
};
