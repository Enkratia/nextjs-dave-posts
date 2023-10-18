import React, { Suspense } from "react";

import UsersPosts from "./components/UsersPosts";

import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";

type UserPageProps = {
  params: {
    userId: string;
  };
};

export const generateMetadata = async ({ params: { userId } }: UserPageProps) => {
  const userData: Promise<User> = getUser(userId);
  const user = await userData;

  return {
    title: user.name,
    description: `This is page of ${user.name}`,
  };
};

const UserPage: React.FC<UserPageProps> = async ({ params: { userId } }) => {
  const userData: Promise<User> = getUser(userId);
  const postsData: Promise<Post[]> = getUserPosts(userId);

  const user = await userData;

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UsersPosts promise={postsData} />
      </Suspense>
    </>
  );
};

export default UserPage;
