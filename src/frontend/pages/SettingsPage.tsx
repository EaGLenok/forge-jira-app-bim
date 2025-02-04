import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import { Heading, Text, Form, Textfield, Box, useForm, Button } from "@forge/react";
import { COMMENT_TEMPLATE_KEY, DEFAULT_COMMENT } from "../constants";

const SettingsPage = () => {
    const [template, setTemplate] = useState("");

    const loadTemplate = async () => {
        const storedTemplate = await invoke("getStorage", { key: COMMENT_TEMPLATE_KEY });
        setTemplate(storedTemplate as string || DEFAULT_COMMENT);
    };

    useEffect(() => {
        loadTemplate();
    }, []);

    const { handleSubmit, register } = useForm<{ template: string }>();

    const onSave = async (formData: { template: string }) => {
        await invoke("setStorage", { key: COMMENT_TEMPLATE_KEY, value: formData.template });
        setTemplate(formData.template);
    };

    const restoreDefault = async () => {
        await invoke("setStorage", { key: COMMENT_TEMPLATE_KEY, value: DEFAULT_COMMENT });
        setTemplate(DEFAULT_COMMENT);
    };

    return (
        <Box>
            <Heading as="h1">Settings</Heading>
            <Text>Configure the default comment template:</Text>
            <Form onSubmit={handleSubmit(onSave)}>
                <Textfield defaultValue={template} {...register("template", { required: true })} placeholder="Comment Template" />
            </Form>
            <Button onClick={restoreDefault}>
                Restore to default
            </Button>
        </Box>
    );
};

export default SettingsPage;
