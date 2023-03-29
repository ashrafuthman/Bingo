import { EnumBooleanMember } from "@babel/types";

export type cardProps = {
  completed: boolean, description: string
}
export type BingoCardProps = {
  index: number,
  card: cardProps,
  bingo: boolean,
  shuffle: () => void,
  checkBox: (index: number) => void,
};

export type SmileyProps = {
  opacity: number,
  top: string,
  right: string,
  left: string,
};