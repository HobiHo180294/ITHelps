import mongoose from 'mongoose';

let isConnected: boolean = false;

export const establishDBConnection = async () => {
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URL) {
		return 'Missing MONGODB_URL';
	}
	if (isConnected) {
		return 'Mongodb is already connected';
	}

	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			dbName: 'ITHelps',
		});
		isConnected = true;
	} catch (error) {
		return error;
	}
};
