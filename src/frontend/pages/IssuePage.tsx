import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import { Box, Button, Form, FormSection, Label, HelperMessage, Textfield, Select, Heading, Text, useForm, FormFooter } from "@forge/react";
import IssueTable from "../components/IssueTable";
import { Issue } from "../types";

interface CreateIssueFormData {
    summary: string;
    description: string;
    issuetype: string;
}

const IssuePage = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

    const fetchIssues = async () => {
        try {
            setLoading(true);
            const data: { issues?: Issue[] } = await invoke("getIssues");
            setIssues(data.issues || []);
        } catch (error) {
            console.error("Error fetching issues:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const { handleSubmit, register, getFieldId } = useForm<CreateIssueFormData>();

    const onSubmitHandler = async (formData: CreateIssueFormData) => {
        try {
            const payload = {
                fields: {
                    summary: formData.summary,
                    description: {
                        type: "doc",
                        version: 1,
                        content: [{ type: "paragraph", content: [{ type: "text", text: formData.description }] }],
                    },
                    issuetype: { name: "Bug" },
                },
            };

            if (editingIssue) {
                await invoke("updateIssue", { issueId: editingIssue.id, data: payload });
            } else {
                payload.fields["project"] = { key: "FP123" };
                await invoke("createIssue", { data: payload });
            }

            setEditingIssue(null);
            setShowForm(false);
            await fetchIssues();
        } catch (error) {
            console.error("Error creating/updating issue:", error);
        }
    };

    const handleDelete = async (issueId: string) => {
        try {
            await invoke("deleteIssue", { issueId });
            await fetchIssues();
        } catch (error) {
            console.error("Error deleting issue:", error);
        }
    };

    const openEditForm = (issue: Issue) => {
        setEditingIssue(issue);
        setShowForm(true);
    };

    return (
        <Box>
            <Heading as="h1">Issues Management</Heading>
            {loading ? <Text>Loading issues...</Text> : <IssueTable issues={issues} onEdit={openEditForm} onDelete={handleDelete} />}

            <Button
                testId="Add new Issue"
                children="Add new Issue"
                onClick={() => {
                    setEditingIssue(null);
                    setShowForm(true);
                }}
            />

            {showForm && (
                <Form onSubmit={handleSubmit(onSubmitHandler)}>
                    <FormSection>
                        <Label labelFor={getFieldId("summary")}>Summary</Label>
                        <Textfield {...register("summary", { required: true })} />

                        <Label labelFor={getFieldId("description")}>Description</Label>
                        <Textfield {...register("description", { required: true })} />

                        <Label labelFor={getFieldId("issuetype")}>Issue Type</Label>
                        <Select {...register("issuetype", { required: true })} options={[{ label: "Bug", value: "Bug" }]} />
                        <HelperMessage>Please fill all required fields.</HelperMessage>
                        <FormFooter>
                            <Button appearance="primary" type="submit">
                                Create Issue
                            </Button>
                        </FormFooter>
                    </FormSection>
                </Form>
            )}
        </Box>
    );
};

export default IssuePage;
