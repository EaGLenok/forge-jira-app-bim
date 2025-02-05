export interface AnswerOption {
    label: string;
    next: string;
}

export interface QuestionNode {
    id: string;
    text: string;
    answers: AnswerOption[];
}

export interface Topic {
    topicId: string;
    questions: QuestionNode[];
}
