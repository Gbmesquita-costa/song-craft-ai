"use server";

import { signOut } from "@/../auth";

const handleLogoutUser = async () => {
  await signOut();
};

export { handleLogoutUser };
