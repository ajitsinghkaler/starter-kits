import { Review } from "./review";
import { Tag } from "./tag";

export type StarterKit = {
    id: number;
    name: string;
    description: string;
    short_description: string;
    image: string;
    tags: Tag[];
    website: string;
    pricing: string;
    rating: number;
    reviews: Review[];
}

