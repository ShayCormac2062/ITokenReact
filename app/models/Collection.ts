import {Realm} from '@realm/react';
import {CollectionType} from "../api/type";

export class Collection extends Realm.Object<Partial<CollectionType>> {
    _id?: Realm.BSON.ObjectId;
    primary_asset_contracts?: any[];
    traits?: any;
    stats?: {
        one_day_volume?: number;
        one_day_change?: number;
        one_day_sales?: number;
        one_day_average_price?: number;
        seven_day_volume?: number;
        seven_day_change?: number;
        seven_day_sales?: number;
        seven_day_average_price?: number;
        thirty_day_volume?: number;
        thirty_day_change?: number;
        thirty_day_sales?: number;
        thirty_day_average_price?: number;
        total_volume?: number;
        total_sales?: number;
        total_supply?: number;
        count?: number;
        num_owners?: number;
        average_price?: number;
        num_reports?: number;
        market_cap?: number;
        floor_price?: number;
    };
    banner_image_url?: string;
    chat_url?: string;
    created_date?: string;
    default_to_fiat?: boolean;
    description?: string;
    dev_buyer_fee_basis_points?: string;
    dev_seller_fee_basis_points?: string;
    discord_url?: string;
    display_data?: {
        card_display_style?: string;
    };
    external_url?: string;
    featured?: boolean;
    featured_image_url?: string;
    hidden?: boolean;
    safelist_request_status?: string;
    image_url?: string;
    is_subject_to_whitelist?: boolean;
    large_image_url?: string;
    medium_username?: string;
    name?: string;
    only_proxied_transfers?: boolean;
    opensea_buyer_fee_basis_points?: string;
    opensea_seller_fee_basis_points?: string;
    payout_address?: string;
    require_email?: boolean;
    short_description?: string;
    slug?: string;
    telegram_url?: string;
    twitter_username?: string;
    instagram_username?: string;
    wiki_url?: string;
    is_nsfw?: boolean;

}
