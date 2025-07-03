import { APIRequestContext, APIResponse, expect } from "@playwright/test";

export default class AuthController {
  static getAuthCookie(mail: any, password: any): string | PromiseLike<string> {
    throw new Error("Method not implemented.");
  }
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async signIn(email: string, password: string): Promise<APIResponse> {
    return await this.request.post("/api/auth/signin", {
      data: {
        email: email,
        password: password,
        remember: false,
      },
    });
  }
  async getAuthCookie(email: string, password: string): Promise<string> {
    const authRequest = await this.signIn(email, password);
    const sid = authRequest.headers()["set-cookie"].split(";")[0];
    expect(sid).not.toBeUndefined();
    return sid;
  }
}
