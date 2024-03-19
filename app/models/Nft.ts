import { Realm } from '@realm/react';
import { OwnerType, NftResponsType } from "../api/type";
import { ObjectSchema } from "realm";

export class Owner extends Realm.Object {
    // Define properties using TypeScript syntax
    user?: { username?: string };
    profile_img_url?: string;
    address?: string;
    config?: string;
}

// Define the schema for Owner separately
const OwnerSchema: ObjectSchema = {
    name: 'Owner',
    embedded: true,
    properties: {
        user: 'Object?',
        profile_img_url: 'string?',
        address: 'string?',
        config: 'string?',
    },
};

// Assign the schema to the Owner class
Object.defineProperty(Owner, 'schema', { value: OwnerSchema });

export class Nft extends Realm.Object {
    id!: string;
    name!: string;
    image_url?: string;
    description?: string;
    ownerUserName?: string;
    price?: number;

}

// Define the schema for Nft separately
const NftSchema: ObjectSchema = {
    name: 'Nft',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        image_url: 'string',
        description: 'string',
        ownerUserName: 'string',
        price: 'int',

    },
};

// Assign the schema to the Nft class
Object.defineProperty(Nft, 'schema', { value: NftSchema });
