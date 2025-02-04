export interface IssueFields {
    summary: string;
    description: string;
    status: { name: string };
    assignee?: { displayName: string } | null;
}

export interface Issue {
    id: string;
    fields: IssueFields;
}
