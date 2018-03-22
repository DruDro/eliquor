export class Recipe {
    id: number;
    name: string;
    authorId: number;
    flavours: Flavour[];
    createdAt: number;
    rating: number;
}

export class Flavour {
    name: string;
    proportion: number;
}