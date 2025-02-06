export enum ButtonType {
    Checkbox = "Checkbox",
    RadioButton = "RadioButton"
}

export interface AnswerOption {
    label: string;
    next: string;
}

export interface QuestionNode {
    id: string;
    text: string;
    type: ButtonType;
    answers: AnswerOption[];
}

export interface Topic {
    topicId: string;
    questions: QuestionNode[];
}
