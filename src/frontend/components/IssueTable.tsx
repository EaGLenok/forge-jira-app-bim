import React from "react";
import { Text, Stack, Inline, Box } from '@forge/react';
import IssueRow from './IssueRow';
import {Issue} from "../types";

interface IssueTableProps {
    issues: Issue[];
    onEdit: (issue: Issue) => void;
    onDelete: (issueId: string) => void;
}

const IssueTable: React.FC<IssueTableProps> = ({ issues, onEdit, onDelete }) => {
    return (
        <Box testId="issue-table" padding="space.200">
            <Stack space="space.200" alignBlock="start" alignInline="start" testId="issue-table-head">
                <Inline
                    space="space.200"
                    alignBlock="start"
                    alignInline="start"
                    separator={false}
                    shouldWrap={false}
                    testId="issue-table-header"
                >
                    <Text>Summary</Text>
                    <Text>Status</Text>
                    <Text>Assignee</Text>
                    <Text>Actions</Text>
                </Inline>
            </Stack>
            <Stack space="space.100" alignBlock="start" alignInline="start" testId="issue-table-body">
                {issues.map((issue) => (
                    <IssueRow key={issue.id} issue={issue} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </Stack>
        </Box>
    );
};

export default IssueTable;
