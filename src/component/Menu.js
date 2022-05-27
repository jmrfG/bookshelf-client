import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RegisterBook } from '../templates/RegisterBook';
import BookTableEspera from '../templates/BookGridEmEspera';
import BookTableAtivos from '../templates/BookGridAtivos';
import BookTableConclusos from '../templates/BookGridConclusos';
import NBookGrid from '../templates/nBookGrid';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MenuTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Register" {...a11yProps(0)} />
                    <Tab label="Complete" {...a11yProps(1)} />
                    <Tab label="Em Espera" {...a11yProps(2)} />
                    <Tab label="Em Leitura" {...a11yProps(3)} />
                    <Tab label="Conclusos" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <RegisterBook />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <NBookGrid />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <BookTableEspera />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <BookTableAtivos />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <BookTableConclusos />
            </TabPanel>
        </Box>
    );
}
