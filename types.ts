export interface CourseInstance {
    id: string;
    start: Date;
    end: Date;
    price: {
        amount: number;
        currency: string;
    };
    slots: number;
    freeSlots: number;
    earlyBird?: {
        end: Date;
        price: {
            amount: number;
            currency: string;
        }
    } | null;
}

export interface Course {
    id: string;
    name: string;
    description: string;
    agenda: string;
    slug: string;
    trainers: Trainer[];
    companyInvoiceEnabled: boolean;
    personalInvoiceEnabled: boolean;
    instances: CourseInstance[];
}

export interface Trainer {
    title: string;
    name: string;
    profession: string;
    photo: string;
}
