import type { ISpecialProjectParametersActions } from "./ISpecialProjectParametersActions";
import type { ISpecialProjectParametersBadges } from "./ISpecialProjectParametersBadges";

export interface IProjectSettings {
  project_name_value: string;
  project_logo_value: string;
  search_popular: string[];
  cart_delivery_price_value: string;
  footer_link_value: string;
  footer_link_description: string;
  special_project_parameters_badges: Array<ISpecialProjectParametersBadges>;
  special_project_parameters_actions: Array<ISpecialProjectParametersActions>;
  global_reviews: {
    rating: number;
    total_ratings_count: number;
    title: string;
  };
  is_side_menu: boolean;
  PAYMENT_SYSTEM_value: string;
  SERVER_IP_ADDR_value: string;
}
