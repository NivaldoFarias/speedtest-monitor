/**
 * Validates and loads environment variables for the server
 * @throws {Error} If required environment variables are missing
 */
function validateEnv() {
	const requiredEnvVars = ["PORT", "HOST", "NODE_ENV", "AUTH_TOKEN"] as const;

	const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

	if (missingEnvVars.length > 0) {
		throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
	}

	return {
		port: parseInt(process.env.PORT ?? "3000"),
		host: process.env.HOST ?? "0.0.0.0",
		nodeEnv: process.env.NODE_ENV,
		authToken: process.env.AUTH_TOKEN || crypto.randomUUID(),
		isDevelopment: process.env.NODE_ENV === "development",
		isProduction: process.env.NODE_ENV === "production",
		isTest: process.env.NODE_ENV === "test",
	};
}

export const env = validateEnv();
