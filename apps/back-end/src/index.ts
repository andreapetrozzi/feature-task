import Fastify from "fastify";
import { faker } from "@faker-js/faker/locale/it";
import { range } from "lodash";
import { PORT } from "./constants";
import cors from "@fastify/cors";
import { sleep } from "../../../packages/utils/src";

const fastify = Fastify({
  logger: false,
  ignoreTrailingSlash: true,
  maxParamLength: 5000,
});

fastify.register(cors, {
  credentials: true,
  origin: "*",
});

fastify.get("/data", async (request, reply) => {
  await sleep(1000);
  const fakeData = range(0, 10001 + Math.random() * 1e4).map((n) => {
    return {
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      birthday: faker.date.birthdate(),
      phone: faker.phone.number(),
      city: faker.address.city(),
      state: faker.address.state(),
      pet: { name: faker.animal.cat(), sex: faker.name.sexType() },
      subscriptionTier: faker.helpers.arrayElement([
        "free",
        "basic",
        "premium",
      ]),
    };
  });
  return fakeData;
});

fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
