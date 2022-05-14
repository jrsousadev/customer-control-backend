export interface CreateToken {
  _id: string;
  permissions: string[],
  roles: string[],
}

export interface TokenAdapter{
  createAuthorization: (data: CreateToken) => Promise<string | null>
}