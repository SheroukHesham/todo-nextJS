import { PrismaClient } from "@/generated/prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // generate fake data for todos
  const todos = await prisma.todo.createMany({
    data: Array.from({ length: 20 }, () => ({
      title: faker.lorem.word(),
      body: faker.lorem.paragraph(2),
    })),
  });

  // // Create a new user with a post
  // const user = await prisma.user.createMany({
  //   data: Array.from({ length: 20 }, () => ({
  //     name: faker.person.fullName(),
  //     email: faker.internet.email(),
  //     password: faker.internet.password(),
  //   })),
  // });

  // // Fetch all users with their posts
  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //   },
  // });
  // console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
