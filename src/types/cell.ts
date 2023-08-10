import { IVector2 } from "./vectory2";

export interface ICell {
  isTraversable: boolean,
  isInteractable: boolean,
  interactText?: string | undefined,
  prompt?: ICellPrompt | undefined
}

export interface ICellPrompt {
  text: string,
  options: ICellPromptOption[]
}

export interface ICellPromptOption {
  text: string,
  action: ICellPromptAction
}

export interface ICellPromptAction {
  type: ICellPromptActionType,
  extra?: string | undefined
}

export enum ICellPromptActionType {
  CANCEL,
  LINK
}