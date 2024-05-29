export interface IhomaPage {
    Title: null;
    background_color1: null;
    background_color2: null;
    background_color3: null;
    background_footer_image: null;
    background_footer_link: null;
    background_image: null;
    background_login_image: null;
    badge_bg_color: null;
    badge_font_color: null;
    button1_border_color: null;
    button2_border_color: null;
    button3_border_color: null;
    button_color1: null;
    button_color2: null;
    button_color3: null;
    button_text_color1: null;
    button_text_color2: null;
    button_text_color3: null;
    card_background_color: null;
    card_heading_color: null;
    card_shape: null;
    card_sub_heading_color: null;
    chat_screen_received_bubble_bg: null;
    chat_screen_received_bubble_text: null;
    chat_screen_sent_bubble_bg: null;
    chat_screen_sent_bubble_text: null;
    default_color: boolean;
    description: null;
    info_box_bg: null;
    info_box_header_color: null;
    info_box_shape: null;
    info_box_text_color: null;
    input_box_bg: null;
    input_box_color: null;
    input_box_label: null;
    input_box_placeholder: null;
    input_box_shape: null;
    is_shadow: boolean;
    is_show_list_icon: boolean;
    is_show_sub_list_icon: boolean;
    list_bg: null;
    list_default_logo: null;
    list_font_color: null;
    list_icon: null;
    list_image_thumbnail_type: null;
    list_title: null;
    list_type: null;
    loder_background_color: null;
    loder_spinner_color: null;
    logo: null;
    main_list_border_color: null;
    main_table_border_color: null;
    masthead_image: string; // Assuming masthead_image is a string path
    nav_background_color: null;
    nav_category_bg: null;
    nav_category_font_color: null;
    nav_category_text_alignment: null;
    nav_hover_icon_color: null;
    nav_hover_text_color: null;
    nav_icon_bg_color: null;
    nav_icon_border_color: null;
    nav_icon_color: null;
    nav_icon_hover_color: null;
    nav_text_color: null;
    navigation_style: null;
    objSession: null;
    pk_id: number;
    show_categorized_list: boolean;
    show_footer: boolean;
    sub_list_border_color: null;
    sublist_bg: null;
    sublist_font_color: null;
    sublist_icon: null;
    sublist_title: null;
    tab_shape: null;
    tabs_active_bg: null;
    tabs_active_font_color: null;
    tabs_non_active_bg: null;
    tabs_non_active_font_color: null;
    text_color1: null;
    text_color2: null;
    vote_content_color: null;
    vote_heading_color: null;
    vote_selected_bg: null;
    vote_selected_text_color: null;
    vote_sub_heading_color: null;
    vote_unselected_bg: null;
    vote_unselected_text_color: null;
    featured_list_bg: null | string;
    featured_list_border_color: null | string;
    featured_list_font_color: null | string;
    featured_list_icon: null | string;
    featured_list_title: null | string;
    font_family: null | string;
    footer_background_color: null | string;
    footer_text: null | string;
    footer_text_color: null | string;
    header_2_background_image: null | string;
    header_2_show_icon: boolean;
    header_2_text_alignment: null | string;
    header_color1: null | string;
    header_color2: null | string;
    header_text_color1: null | string;
    headre_text_color_2: null | string;
    homepage_description_box_background: null | string;
    homepage_description_box_fold_color: null | string;
    homepage_description_box_text: null | string;
    homepage_description_box_title: null | string;
    icon_background_color: null | string;
    icon_button1_bg: null | string;
    icon_button1_color: null | string;
    icon_button2_bg: null | string;
    icon_button2_color: null | string;
    icon_button_shape: null | string;
    icon_color: null | string;
    image: null | string;

    eventStartDate: null | string;
    eventTitle: string;
    eventUrl: string;
    event_End_Date: string;
    event_Start_Date: string;
    event_bg: string;
    event_homescreen_design: string;
    event_logo_middle: string;
    event_logo_right: string;
    eventAddress: string;
    eventDesc: string;
    eventEmail: string;
    eventEndDate: null | string;
    eventLogo: string;
    eventActivity: EventActivity[];
    eventNews: NewsData[];
    eventSponsers: SponsorParticipationData[];
    featuredSession: SessionData[];
    infoPageDetail: InfoPageData[];
    eventOrganisers:EventOrganizer[];
}

export interface EventActivity {
    activity_category: null | string;
    end_datetime: null | string;
    event_activity_datetime: string;
    event_activity_description: string;
    event_activity_title: string;
    fk_event_id: null | number;
    icon: string;
    pk_event_activity_id: number;
    short_description: string;
    start_datetime: string;
}

export interface NewsData {
    news_Date: string;
    news_description: string;
    news_title: string;
    pk_news_id: number;
}

export interface SponsorParticipationData {
    pk_sponsor_participation_id: number;
    sponsor_participation_banner: null | string;
    sponsor_participation_description: string;
    sponsor_participation_logo: string;
    sponsor_participation_title: string;
    sponsor_participation_website: string;
    sponser_category:string;
}

export interface SessionData {
    is_live: boolean;
    pk_session_id: number;
    session_description: string;
    session_end_date_time: string;
    session_start_date_time: string;
    session_title: string;
    uploadthumbnail: string; // Assuming this is a URL to an uploaded thumbnail image
}


export interface InfoPageData {
    fk_event_id: number;
    icon: string;
    open_counter: null | number;
    order: number;
    pk_infopage_id: number;
    short_description: string;
    text: string;
    title: string;
}

interface EventOrganizer {
    event_bg: null;
    fk_client_id: number;
    fk_event_id: number;
    is_active: boolean;
    is_bookmarked: boolean;
    is_delete: boolean;
    order: number;
    organiser_descriptions: null | string;
    organiser_logos: null | string;
    organiser_name: string;
    organiser_websites: null | string;
    pk_organiser_id: number;
}
