export type NftResponsType = {
    collectionId: number;


    id: string;
    num_sales: number;
    background_color: string;
    image_url: string;
    image_preview_url: string;
    image_thumbnail_url: string;
    image_original_url: string;
    animation_url: string;
    animation_original_url: string;
    name: string;
    description: string;
    external_link: string;
    asset_contract: {
        address: string;
        asset_contract_type: string;
        created_date: string;
        name: string;
        nft_version: string | null;
        opensea_version: string;
        owner: number;
        schema_name: string;
        symbol: string;
        total_supply: number | null;
        description: string;
        external_link: string | null;
        image_url: string | null;
        default_to_fiat: boolean;
        dev_buyer_fee_basis_points: number;
        dev_seller_fee_basis_points: number;
        only_proxied_transfers: boolean;
        opensea_buyer_fee_basis_points: number;
        opensea_seller_fee_basis_points: number;
        buyer_fee_basis_points: number;
        seller_fee_basis_points: number;
        payout_address: string | null;
    };
    permalink: string;
    collection: {
        banner_image_url: string;
        chat_url: string | null;
        created_date: string;
        default_to_fiat: boolean;
        description: string;
        dev_buyer_fee_basis_points: string;
        dev_seller_fee_basis_points: string;
        discord_url: string | null;
        display_data: {
            card_display_style: string;
        };
        external_url: string;
        featured: boolean;
        featured_image_url: string;
        hidden: boolean;
        safelist_request_status: string;
        image_url: string;
        is_subject_to_whitelist: boolean;
        large_image_url: string;
        medium_username: string | null;
        name: string;
        only_proxied_transfers: boolean;
        opensea_buyer_fee_basis_points: string;
        opensea_seller_fee_basis_points: string;
        payout_address: string | null;
        require_email: boolean;
        short_description: string | null;
        slug: string;
        telegram_url: string | null;
        twitter_username: string | null;
        instagram_username: string;
        wiki_url: string | null;
        is_nsfw: boolean;
    };
    decimals: number;
    token_metadata: string;
    is_nsfw: boolean;
    owner: {
        user: {
            username: string;
        };
        profile_img_url: string;
        address: string;
        config: string;
    };
    sell_orders: any[];
    creator: {
        user: {
            username: string;
        };
        profile_img_url: string;
        address: string;
        config: string;
    };
    traits: {
        trait_type: string;
        value: string;
        display_type: string | null;
        max_value: string | null;
        trait_count: number;
        order: string | null;
    }[];
    last_sale: any;
    top_bid: any;
    listing_date: string;
    is_presale: boolean;
    transfer_fee_payment_token: string;
    transfer_fee: string;
    token_id: string;
};
export type CollectionType = {
    primary_asset_contracts: any[]; // You may define a specific type for the array elements if known
    traits: Record<string, any>; // Assuming traits can be any key-value pairs
    stats: {
        one_day_volume: number;
        one_day_change: number;
        one_day_sales: number;
        one_day_average_price: number;
        seven_day_volume: number;
        seven_day_change: number;
        seven_day_sales: number;
        seven_day_average_price: number;
        thirty_day_volume: number;
        thirty_day_change: number;
        thirty_day_sales: number;
        thirty_day_average_price: number;
        total_volume: number;
        total_sales: number;
        total_supply: number;
        count: number;
        num_owners: number;
        average_price: number;
        num_reports: number;
        market_cap: number;
        floor_price: number;
    };
    banner_image_url: string | null;
    chat_url: string | null;
    animation_original_url?: string | null;
    created_date: string;
    default_to_fiat: boolean;
    description: string | null;
    dev_buyer_fee_basis_points: string;
    dev_seller_fee_basis_points: string;
    discord_url: string | null;
    display_data: {
        card_display_style: string;
    };
    external_url: string | null;
    featured: boolean;
    featured_image_url: string | null;
    hidden: boolean;
    safelist_request_status: string;
    image_url: string | null;
    is_subject_to_whitelist: boolean;
    large_image_url: string | null;
    medium_username: string | null;
    name: string;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: string;
    opensea_seller_fee_basis_points: string;
    payout_address: string;
    require_email: boolean;
    short_description: string | null;
    slug: string;
    telegram_url: string | null;
    twitter_username: string | null;
    instagram_username: string | null;
    wiki_url: string | null;
    is_nsfw: boolean;
}
export type OwnerType = {
    user?: {
        username?: string;
    };
    profile_img_url?: string;
    address?: string;
    config?: string;
};
export type NftType = {
    name: string
    image_url: string
    description: string
    ownerUserName: string
    price: number,
    id: string,
}
