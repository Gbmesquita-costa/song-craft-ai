import { hash } from "bcryptjs";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { getUserByEmail } from "@/repositories/user";

import { authorizeCredentials } from "./authorize-credentials";

// The repository talks to Postgres through Prisma; replace it so these tests
// never need a database.
vi.mock("@/repositories/user", () => ({
  getUserByEmail: vi.fn(),
  getUserById: vi.fn(),
}));

const getUserByEmailMock = vi.mocked(getUserByEmail);

type User = NonNullable<Awaited<ReturnType<typeof getUserByEmail>>>;

const PASSWORD = "s3nha-forte";
let storedUser: User;

beforeAll(async () => {
  storedUser = {
    id: "user_1",
    name: "Ana Silva",
    email: "ana@example.com",
    emailVerified: null,
    image: null,
    password: await hash(PASSWORD, 4),
    role: "USER",
  };
});

beforeEach(() => {
  getUserByEmailMock.mockReset();
});

describe("authorizeCredentials", () => {
  it("returns only the public profile for valid credentials", async () => {
    getUserByEmailMock.mockResolvedValue(storedUser);

    const result = await authorizeCredentials({
      email: "ana@example.com",
      password: PASSWORD,
    });

    expect(result).toEqual({
      id: "user_1",
      name: "Ana Silva",
      email: "ana@example.com",
      image: null,
    });
    expect(result).not.toHaveProperty("password");
  });

  it("looks the user up by the normalized e-mail", async () => {
    getUserByEmailMock.mockResolvedValue(storedUser);

    await authorizeCredentials({
      email: "  ANA@Example.com ",
      password: PASSWORD,
    });

    expect(getUserByEmailMock).toHaveBeenCalledWith("ana@example.com");
  });

  it("rejects a wrong password", async () => {
    getUserByEmailMock.mockResolvedValue(storedUser);

    await expect(
      authorizeCredentials({ email: "ana@example.com", password: "errada123" })
    ).resolves.toBeNull();
  });

  it("rejects an unknown e-mail", async () => {
    getUserByEmailMock.mockResolvedValue(null);

    await expect(
      authorizeCredentials({ email: "nobody@example.com", password: PASSWORD })
    ).resolves.toBeNull();
  });

  it("rejects accounts without a password (e.g. OAuth-only users)", async () => {
    getUserByEmailMock.mockResolvedValue({ ...storedUser, password: null });

    await expect(
      authorizeCredentials({ email: "ana@example.com", password: PASSWORD })
    ).resolves.toBeNull();
  });

  it("rejects invalid input without touching the repository", async () => {
    await expect(
      authorizeCredentials({ email: "not-an-email", password: "123" })
    ).resolves.toBeNull();
    await expect(authorizeCredentials(undefined)).resolves.toBeNull();

    expect(getUserByEmailMock).not.toHaveBeenCalled();
  });
});
