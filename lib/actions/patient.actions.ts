"use server";
import { users } from "@/app/lib/appwrite.config";
import { parseStringify } from "@/app/lib/utils";
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
    return parseStringify(newUser);
  } catch (error: any) {
    console.log(error);
    if (error && error?.code == 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      console.log({ documents });
      return documents?.users[0];
    }
  }
};
export const getUser = async (userId:string) => {
 
  try {
   
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error: any) {
    console.log(error);
   
  }
};
