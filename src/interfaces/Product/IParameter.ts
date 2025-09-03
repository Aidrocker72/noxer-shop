export interface IParameter {
  Parameter_ID: number;
  name: string;
  parameter_string: string;
  price: number;
  old_price: number | null;
  chosen?: boolean;
  disabled?: boolean;
  extra_field_color?: string | null;
  extra_field_image?: string | null;
  parameter_json?: Record<string, any> | null;
  sort_order?: number | null;
}
