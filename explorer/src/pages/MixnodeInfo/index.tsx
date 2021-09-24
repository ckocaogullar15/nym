import * as React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { MixnodesTable } from '../../components/MixnodesTable';
import { MainContext } from 'src/context/main';
import { MixNodeResponseItem, ApiState } from 'src/typeDefs/explorer-api';
import { useParams } from 'react-router-dom';
import { MixNodeResponse } from 'src/typeDefs/explorer-api';
import { ContentCard } from 'src/components/ContentCard';

export const PageMixnodeInfo: React.FC = () => {
    const { mixnodes } = React.useContext(MainContext);
    let { id }: any = useParams();

    const [selectedNodeInfo, setSelectedNodeInfo] = React.useState<ApiState<MixNodeResponse>>();

    React.useEffect(() => {
        const data: MixNodeResponse = mixnodes && mixnodes?.data?.filter((eachMixnode: MixNodeResponseItem) => {
            return eachMixnode.mix_node.identity_key === id
        }) || [];
        setSelectedNodeInfo({ data, isLoading: false })
    }, [mixnodes])

    return (
        <>
            <Box component='main' sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>
                            Mixnode Detail
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <MixnodesTable mixnodes={selectedNodeInfo} />
                    </Grid>

                    <Grid item xs={12}>
                        <ContentCard title='Bond Breakdown'>
                            <p>i am the bond breakdown section with lots of stuff</p>
                        </ContentCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ContentCard title='Mixnode Stats'>
                            <p>I am the mixnode stats</p>
                        </ContentCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ContentCard title='uptine story'>
                            <p>I am the uptime story</p>
                        </ContentCard>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}