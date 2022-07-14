import { Pool } from "pg";

//const dbUrl = process.env.DATABASE_URL || "postgres://localhost:5432/cyf";

// const pool = new Pool({
// 	connectionString: dbUrl,
// 	connectionTimeoutMillis: 5000,
// 	ssl: dbUrl.includes("localhost") ? false : { rejectUnauthorized: false },
// });

const pool = new Pool({
	user: "ika",
	host: "localhost",
	database: "final",
	password: "amos1982",
	port: 5432,
});


export const connectDb = async () => {
	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.log("Postgres connected to", client.database);
	client.release();
};

export const disconnectDb = () => pool.close();

export default { query: pool.query.bind(pool) };
