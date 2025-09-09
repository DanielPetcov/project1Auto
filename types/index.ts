import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  btnType?: "button" | "submit";
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

export interface CarProps {
  _id: string;
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
  images: string[];
}

export interface FetchCarsProps {
  manufacturer?: string | string[];
  model?: string | string[];
  year?: string | string[];
  limit?: string | string[];
  fuel_type?: string | string[];
}

export interface FetchCarsReturnType {
  data: CarProps[];
  message?: string;
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}
