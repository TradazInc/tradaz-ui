export interface Store {
  id: string;
  name: string;
  organizationId: string;
  createdAt: Date;
  updatedAt?: Date | undefined;
  address: string;
}
