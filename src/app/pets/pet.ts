export interface Pet{
    id?: string;
    name: string;
    breed: string;
    color: string;
    sexo: string;
    specie: string;
    ownerid: string;
}
export interface PetReceber{
    items: Array<Pet>;
}