export class AuthOperations {
  static getTokenFromReq = (req: any) => {
    return (req.cookies["access_token"] as string) || null;
  };

  static generateAuthHeader = (token: string) => {
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  static generateAuthHeaderFromReq = (req: any) => {
    return this.generateAuthHeader(this.getTokenFromReq(req));
  };
}
