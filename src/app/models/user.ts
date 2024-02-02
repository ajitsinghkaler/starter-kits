import { StarterKit } from "./starter-kit";

export interface User {
    id: number;
    name: string;
    image: string;
    email: string;
    password: string;
    kits: StarterKit[];
}