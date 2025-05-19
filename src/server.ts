import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;

async function main() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(config.database_url as string);
    console.log('Database connection successful.');

    server = app.listen(config.port, () => {
      console.log(`World Auto Solution is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error starting the server:', err);
    process.exit(1); // Exit immediately if an error occurs during startup
  }
}

main();

process.on('unhandledRejection', (error: any) => {
  const errorMessage =
    config.NODE_ENV === 'production'
      ? `${error.message}\n${error.stack} 😈 unhandledRejection is detected, shutting down ...`
      : '😈 unhandledRejection is detected, shutting down ...';

  console.error(errorMessage);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (error: any) => {
  const errorMessage =
    config.NODE_ENV === 'production'
      ? `${error.message}\n${error.stack} 😈 uncaughtException is detected, shutting down ...`
      : '😈 uncaughtException is detected, shutting down ...';

  console.error(errorMessage);
  process.exit(1);
});


const connections: Record<string, mongoose.Connection> = {};

export const connectToCentralDatabase = async () => {
  await mongoose.connect(process.env.CENTRAL_DB_URI || '');
  console.log('✅ Connected to Central Database');
};

export const connectToTenantDatabase = async (tenantId: string, dbUri: string) => {
  if (connections[tenantId]) {
    console.log(`✅ Reusing connection for tenant: ${tenantId}`);
    return connections[tenantId];
  }

  const connection = await mongoose.createConnection(dbUri).asPromise();
  connections[tenantId] = connection;
  console.log(`✅ Connected to Tenant Database: ${tenantId}`);
  return connection;
};
