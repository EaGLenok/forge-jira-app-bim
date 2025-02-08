import React from 'react';
import { Box, Heading, xcss } from '@forge/react';
import { Topic } from '../../../utils/types';

const previewBoxStyles = xcss({
    display: 'block',
    marginTop: 'space.400',
    padding: 'space.300',
    borderRadius: 'border.radius',
    borderWidth: 'border.width',
    borderColor: 'color.border',
    borderStyle: 'solid',
    backgroundColor: 'color.background.neutral.subtle',
    overflow: 'auto',
});

const headingWrapperStyles = xcss({
    display: 'block',
    marginBottom: 'space.200',
});

interface Props {
    data: Topic[];
}

const PreviewBlock: React.FC<Props> = ({ data }) => (
    <Box xcss={previewBoxStyles}>
        <Box xcss={headingWrapperStyles}>
            <Heading as="h4">Current Topics</Heading>
        </Box>
        <Box>{JSON.stringify(data, null, 2)}</Box>
    </Box>
);

export default PreviewBlock;
