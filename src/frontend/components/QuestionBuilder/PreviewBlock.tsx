import React from 'react';
import { Box, Heading, xcss, Text } from '@forge/react';
import { Topic } from '../../../utils/types';

const previewBoxStyles = xcss({
    marginTop: 'space.400',
    padding: 'space.300',
    borderRadius: 'border.radius',
    borderWidth: 'border.width',
    borderColor: 'color.border',
    borderStyle: 'solid',
    backgroundColor: 'color.background.neutral.subtle',
    overflow: 'auto'
});

const headingWrapperStyles = xcss({
    marginBottom: 'space.200'
});

interface Props {
    data: Topic[];
}

const PreviewBlock: React.FC<Props> = ({ data }) => (
    <Box xcss={previewBoxStyles}>
        <Box xcss={headingWrapperStyles}>
            <Heading as="h4">Current Topics</Heading>
        </Box>
        <Box>
            <Text>{JSON.stringify(data, null, 2)}</Text>
        </Box>
    </Box>
);

export default PreviewBlock;
