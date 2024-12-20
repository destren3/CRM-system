class TokenService {
  private accessToken: string | null = null;

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  clearAccessToken() {
    this.accessToken = null;
  }
}

export const tokenService = new TokenService();