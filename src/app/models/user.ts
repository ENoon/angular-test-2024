export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  company?: string;
  showMore?: boolean;
}
