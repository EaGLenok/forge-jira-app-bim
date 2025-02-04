import * as React from 'react';
import ForgeReconciler, {
    Tabs,
    TabList,
    Tab,
    TabPanel
} from '@forge/react';

import IssuePage from './pages/IssuePage';
import SettingsPage from './pages/SettingsPage';
import {useState} from "react";
import QuestionnairePage from "./pages/QuestionnairePage";

const App = () => {
    return (
        <Tabs id="default">
            <TabList>
                <Tab>Questions</Tab>
            </TabList>
            <TabPanel>
                <QuestionnairePage />
            </TabPanel>
        </Tabs>
    );
};

ForgeReconciler.render(<App/>);
