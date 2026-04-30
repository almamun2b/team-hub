import { Server } from "http";
import app from "./app";
import { env } from "./config/env";
import seedAdmin from "./helpers/seed";
import { SocketHelper } from "./helpers/socketHelper";

async function bootstrap() {
  let server: Server;

  try {
    await seedAdmin();

    const httpServer = app.listen(env.port, () => {
      console.log(`🚀 Server is running on http://localhost:${env.port}`);
    });

    SocketHelper.initSocket(httpServer);

    const exitHandler = () => {
      if (server) {
        server.close(() => {
          console.log("Server closed gracefully.");
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };

    process.on("unhandledRejection", (error) => {
      console.log(
        "Unhandled Rejection is detected, we are closing our server..."
      );
      if (server) {
        server.close(() => {
          console.log(error);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
}

bootstrap();
