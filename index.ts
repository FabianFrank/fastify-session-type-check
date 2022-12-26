import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";

const fastify = Fastify({
  logger: true,
});

declare module "fastify" {
  interface Session {
    user_id: string;
  }
}

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: "a secret with minimum length of 32 characters",
});

// Declare a route
fastify.get("/", async (request, _reply) => {
  const user_id = request.session.user_id ? request.session.user_id : "";
  return { hello: "world", user_id };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
