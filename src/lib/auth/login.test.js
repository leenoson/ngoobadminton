// /__tests__/login.test.js
import { loginWithEmail } from "@/lib/auth/login"

describe("loginWithEmail", () => {
  it("should login successfully", async () => {
    const mockSupabase = {
      auth: {
        signInWithPassword: jest.fn().mockResolvedValue({
          error: null,
        }),
      },
    }

    const result = await loginWithEmail(mockSupabase, {
      email: "test@gmail.com",
      password: "123456",
    })

    expect(result).toBe(true)
    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "test@gmail.com",
      password: "123456",
    })
  })

  it("should throw error when credentials invalid", async () => {
    const mockSupabase = {
      auth: {
        signInWithPassword: jest.fn().mockResolvedValue({
          error: { message: "Invalid login" },
        }),
      },
    }

    await expect(
      loginWithEmail(mockSupabase, {
        email: "wrong@gmail.com",
        password: "wrong",
      }),
    ).rejects.toThrow("INVALID_CREDENTIALS")
  })
})
