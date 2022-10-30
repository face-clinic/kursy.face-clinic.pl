export interface Course {
    id: string;
    name: string;
    description: string;
    agenda: string;
    start: Date;
    end: Date;
    slug: string;
    price: {
        amount: number;
        currency: string;
    },
    earlyBird?: {
        end: Date;
        price: {
            amount: number;
            currency: string;
        }
    }
    trainers: Trainer[]
}

export interface Trainer {
    title: string;
    name: string;
    profession: string;
    photo: string;
}