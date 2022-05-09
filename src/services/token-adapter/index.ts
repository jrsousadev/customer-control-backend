export interface CreateToken {
  _id: string;
}

export interface TokenAdapter{
  createAuthorization: (data: CreateToken) => Promise<string | null>
}