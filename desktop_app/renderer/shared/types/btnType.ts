export type SquareScaleType = "small" | "small_2" | "small_3" | "large";
export type RoundScaleType = "small" | "large";
export type ButtonType = "red" | "disable" |"point";
export type StyleType = "round_1" | "round_2" | "square";
export type ScaleType = SquareScaleType | RoundScaleType;


export interface BtnType {
    text: string;
    style?: StyleType;
    scale?: SquareScaleType | RoundScaleType;
    type?: ButtonType;
}

export type styleObjType = {
    borderRadius: string;
    backgroundColor: string;
    width: string;
    height: string;
  };