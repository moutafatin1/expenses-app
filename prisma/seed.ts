import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // this id is not constant
  const user = await prisma.user.findUnique({
    where: {
      id: "clarxwdq90000uwteymctprrh",
    },
  });

  if (!user) {
    throw new Error("User does not exists");
  }

  const educationCategory = await prisma.category.create({
    data: {
      name: "Education",
      emoji: "📚",
      userId: user.id,
    },
  });
  const travelCategory = await prisma.category.create({
    data: {
      name: "Travel",
      emoji: "✈️",
      userId: user.id,
    },
  });

  await prisma.transaction.create({
    data: {
      type: "income",
      amount: 15.1,
      categoryId: educationCategory.id,
      userId: user.id,
    },
  });
  await prisma.transaction.create({
    data: {
      type: "expense",
      amount: 15.1,
      categoryId: travelCategory.id,
      userId: user.id,
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
