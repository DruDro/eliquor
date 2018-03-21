export class Recipe {
    id: number;
    name: string;
    authorId: number;
    flavours: Flavour[];
    createdAt: number;
}

export class Flavour {
    name: string;
    proportion: number;
}