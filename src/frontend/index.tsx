import * as React from 'react';
import ForgeReconciler, {
    Tabs,
    TabList,
    Tab,
    TabPanel
} from '@forge/react';
import QuestionnairePage from "./pages/QuestionnairePage";
import QuestionBuilderPage from "./pages/QuestionBuilderPage";

const App = () => {
    return (
        <Tabs id="default">
            <TabList>
                <Tab>Questions</Tab>
                <Tab>Question Builder</Tab>
            </TabList>
            <TabPanel>
                <QuestionnairePage/>
                <QuestionBuilderPage/>
            </TabPanel>
        </Tabs>
    );
};

ForgeReconciler.render(<App/>);
