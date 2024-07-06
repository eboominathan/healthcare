import { users } from "@/app/lib/appwrite.config";
import { ID, Query } from "node-appwrite";

export const CreateUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log({ newUser });
  } catch (error: any) {
    if (error && error?.code == 409) {
      const documents = await users.list();
      Query.equal("email", [user.email]);
      return documents?.users[0];
    }
  }
};