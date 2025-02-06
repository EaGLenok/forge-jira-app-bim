import * as React from 'react';
import ForgeReconciler, {
    Tabs,
    TabList,
    Tab,
    TabPanel
} from '@forge/react';
import QuestionnairePage from "./pages/QuestionnairePage";

const App = () => {
    return (
        <Tabs id="default">
            <TabList>
                <Tab>Questions</Tab>
            </TabList>
            <TabPanel>
                <QuestionnairePage/>
            </TabPanel>
        </Tabs>
    );
};

ForgeReconciler.render(<App/>);
