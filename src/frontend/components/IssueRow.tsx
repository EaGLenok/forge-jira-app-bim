import React from "react";
import { Text, Button, Stack, Inline, Box } from "@forge/react";
import { Issue } from "../types";

interface IssueRowProps {
    issue: Issue;
    onEdit: (issue: Issue) => void;
    onDelete: (issueId: string) => void;
}

const IssueRow: React.FC<IssueRowProps> = ({ issue, onEdit, onDelete }) => {
    return (
        <Box testId="issue-row" padding="space.100">
            <Stack space="space.100" alignBlock="start" alignInline="start" testId="issue-stack">
                <Text>
              Summary:{issue.fields.summary}
                </Text>
                <Text>
                    Status: {issue.fields.status.name}
                </Text>
                <Text>
                    Assignee: {issue.fields.assignee ? issue.fields.assignee.displayName : "Unassigned"}
                </Text>
                <Inline space="space.100" alignBlock="start" alignInline="start" separator testId="issue-inline">
                    <Button appearance="primary" type="button" shouldFitContainer onClick={() => onEdit(issue)}>
                        Edit
                    </Button>
                    <Button appearance="danger" type="button" shouldFitContainer onClick={() => onDelete(issue.id)}>
                        Delete
                    </Button>
                </Inline>
            </Stack>
        </Box>
    );
};

export default IssueRow;
