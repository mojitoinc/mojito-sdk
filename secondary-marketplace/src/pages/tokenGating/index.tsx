import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormGroup, FormControlLabel, Grid } from '@mui/material';
import { useTokenGating, TokenGatingDetails } from '@/provider/TokenGatingProvider';

const TokenGating = () => {

    const { setTokenGatingDetails, tokenGatingDetails } = useTokenGating();
    const [showInvoice, setShowInvoice] = useState<boolean>(false);
    const [isError, setIsError] = useState<{
        configError: boolean;
    }>({
        configError: false,
    });

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (!name.includes('.')) {
            setTokenGatingDetails((prev) => ({
                ...prev,
                [name]: value === '' ? undefined : value,
            }))
        }
        if (name.includes('.')) {
            const [key, childKey] = name.split('.');
            setTokenGatingDetails(prev => ({
                ...prev,
                [key]: {
                    ...(prev[key as keyof TokenGatingDetails] as any),
                    [childKey]: value
                }
            }))
        }
    }, [setTokenGatingDetails]);

    const handleOpenModal = useCallback(() => {
        const { groupId, collectionItemId, isClaimToken, orgId } = tokenGatingDetails;
        if (!groupId || (!collectionItemId && isClaimToken) || !orgId) {
            setIsError(prev => ({
                ...prev,
                configError: true
            }));
            return;
        }
        setIsError(prev => ({
            ...prev,
            configError: false
        }));
        setTokenGatingDetails(prev => ({
            ...prev,
            open: true
        }));
    }, [setTokenGatingDetails, tokenGatingDetails]);

    const handleClaim = useCallback((_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setTokenGatingDetails(prev => ({
            ...prev,
            isClaimToken: checked
        }))
    }, [setTokenGatingDetails]);

    const handleWalletOptions = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const { name } = event.target;
        const isAllUnchecked = Object.values(tokenGatingDetails.walletOptions).filter(value => !value);
        if (!(isAllUnchecked.length == 2 && !checked)) {
            setTokenGatingDetails(prev => ({
                ...prev,
                walletOptions: {
                    ...prev.walletOptions,
                    [name as keyof any]: checked
                }
            }))
        }
    }, [setTokenGatingDetails, tokenGatingDetails.walletOptions]);

    const getInvoice = useCallback(async () => {
        setShowInvoice(true);
    }, []);

    const isClaim = useMemo(() => tokenGatingDetails.isClaimToken, [tokenGatingDetails.isClaimToken]);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
            <Typography sx={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Token Gating</Typography>
            <Typography>&nbsp;&nbsp;Token gating is a verification method whereby communities can provide exclusive access to spaces, events, content, and communities to people who own specific digital assets in their wallet</Typography>
            <Typography sx={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', marginTop: '16px' }}>
                Token Gating Configuration
            </Typography>
            <Grid container>
                <Grid item md={6} xs={12}>
                    <Box sx={{ width: 'calc(100% - 16px)', marginBottom: '16px', marginRight: '16px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>
                            Organization ID
                            <Typography sx={{ color: 'red', display: 'inline-block', marginLeft: '4px' }}>*</Typography>
                        </Typography>
                        <TextField
                            required
                            placeholder="Enter Organization ID"
                            type="text"
                            name="orgId"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.orgId}
                            autoComplete="off"
                            onChange={handleChange} />
                        {!tokenGatingDetails.orgId && isError.configError && <Typography sx={{ color: 'red' }}>Organization ID is required</Typography>}
                    </Box>
                </Grid>
            </Grid>
            <Typography sx={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>Wallet Configuration</Typography>
            <Grid container sx={{ marginBottom: '16px' }}>
                <Grid item md={4}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox name='enableMetamask' sx={{
                            '& :hover': {
                                backgroundColor: 'none'
                            }
                        }} checked={tokenGatingDetails?.walletOptions?.enableMetamask} onChange={handleWalletOptions} />} label={'Metamask'} />
                    </FormGroup>
                </Grid>
                <Grid item md={4}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox name='enableWalletConnect' sx={{
                            '& :hover': {
                                backgroundColor: 'none'
                            }
                        }} checked={tokenGatingDetails?.walletOptions?.enableWalletConnect} onChange={handleWalletOptions} />} label={'Wallet Connect'} />
                    </FormGroup>
                </Grid>
                <Grid item md={4}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox name="enableEmail" sx={{
                            '& :hover': {
                                backgroundColor: 'none'
                            }
                        }} checked={tokenGatingDetails?.walletOptions?.enableEmail} onChange={handleWalletOptions} />} label={'Email Wallet'} />
                    </FormGroup>
                </Grid>
            </Grid>
            <Typography sx={{ fontWeight: 600, fontSize: '18px', marginBottom: '16px' }}>Screen Content Configuration</Typography>
            <Grid container sx={{ width: '100%' }}>
                <Grid item md={6} xs={12}>
                    <Box sx={{ width: 'calc(100% - 16px)', marginBottom: '10px', marginRight: '16px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>Screen Title</Typography>
                        <TextField
                            placeholder="Enter Screen Title"
                            type="text"
                            name="screenConfig.title"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.screenConfig?.title}
                            autoComplete="off"
                            onChange={handleChange} />
                    </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box sx={{ width: '100%' }}>
                        <Typography sx={{ marginBottom: '8px' }}>Screen SubTitle</Typography>
                        <TextField
                            placeholder="Enter Screen Subtitle"
                            type="text"
                            name="screenConfig.subTitle"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.screenConfig?.subTitle}
                            autoComplete="off"
                            onChange={handleChange} />
                    </Box>
                </Grid>
            </Grid>
            <Typography sx={{ fontWeight: 600, fontSize: '18px', margin: '16px 0' }}> Claim Success Screen Details</Typography>
            <Grid container>
                <Grid item md={6} xs={12}>
                    <Box sx={{ width: 'calc(100% - 16px)', marginBottom: '10px', marginRight: '16px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>Token Name</Typography>
                        <TextField
                            placeholder="Enter Token Name"
                            type="text"
                            name="successScreenDetail.tokenName"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.successScreenDetail?.tokenName}
                            autoComplete="off"
                            onChange={handleChange} />
                    </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box sx={{ width: 'calc(100% - 16px)', marginBottom: '10px', marginRight: '16px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>Token SubTitle</Typography>
                        <TextField
                            placeholder="Enter Token SubTitle"
                            type="text"
                            name="successScreenDetail.tokenSubtitle"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.successScreenDetail?.tokenSubtitle}
                            autoComplete="off"
                            onChange={handleChange} />
                    </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box sx={{ width: 'calc(100% - 16px)', marginBottom: '10px', marginRight: '16px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>Token Image</Typography>
                        <TextField
                            placeholder="Enter Token Image"
                            type="text"
                            name="successScreenDetail.tokenImage"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.successScreenDetail?.tokenImage}
                            autoComplete="off"
                            onChange={handleChange} />
                    </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box sx={{ width: 'calc(100% - 16px)', marginBottom: '10px', marginRight: '16px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>Token Button Text</Typography>
                        <TextField
                            placeholder="Enter Token Button Text"
                            type="text"
                            name="successScreenDetail.tokenButtonText"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.successScreenDetail?.tokenButtonText}
                            autoComplete="off"
                            onChange={handleChange} />
                    </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box sx={{ width: 'calc(100% - 16px)', marginBottom: '10px', marginRight: '16px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>Redirection URL</Typography>
                        <TextField
                            placeholder="Enter Redirection URL"
                            type="text"
                            name="successScreenDetail.redirectionPageURL"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.successScreenDetail?.redirectionPageURL}
                            autoComplete="off"
                            onChange={handleChange} />
                    </Box>
                </Grid>
            </Grid>
            <Typography sx={{ fontWeight: 600, fontSize: '18px', margin: '16px 0' }}> No Claim Screen Details</Typography>
            <Grid container>
                <Grid item md={6} xs={12}>
                    <Box sx={{ width: 'calc(100% - 16px)', marginBottom: '10px', marginRight: '16px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>No Claim Title</Typography>
                        <TextField
                            placeholder="Enter no claim title"
                            type="text"
                            name="noClaimScreenDetail.title"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.noClaimScreenDetail?.title}
                            autoComplete="off"
                            onChange={handleChange} />
                    </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box sx={{ width: 'calc(100% - 16px)', marginBottom: '10px', marginRight: '16px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>No Claim Button Text</Typography>
                        <TextField
                            placeholder="Enter no claim button text"
                            type="text"
                            name="noClaimScreenDetail.primaryButtonTitle"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.noClaimScreenDetail?.primaryButtonTitle}
                            autoComplete="off"
                            onChange={handleChange} />
                    </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box sx={{ width: 'calc(100% - 16px)', marginBottom: '10px', marginRight: '16px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>Redirection URL</Typography>
                        <TextField
                            placeholder="Enter Redirection URL"
                            type="text"
                            name="noClaimScreenDetail.redirectionPageURL"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.noClaimScreenDetail?.redirectionPageURL}
                            autoComplete="off"
                            onChange={handleChange} />
                    </Box>
                </Grid>
            </Grid>
            <FormGroup>
                <FormControlLabel control={<Checkbox sx={{
                    '& :hover': {
                        backgroundColor: 'none'
                    }
                }} checked={tokenGatingDetails?.isClaimToken} onChange={handleClaim} />} label={'NFT Claim'} />
            </FormGroup>
            <Typography sx={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', marginTop: '16px' }}>
                Token Gating Claim Configuration
            </Typography>
            <Grid container>
                <Grid item md={4} sm={6} xs={12}>
                    <Box sx={{ width: 'calc(100% - 16px)', marginBottom: '10px', marginRight: '16px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>Group ID
                            <Typography sx={{ color: 'red', display: 'inline-block', marginLeft: '4px' }}>*</Typography>
                        </Typography>
                        <TextField
                            placeholder="Enter Group ID"
                            type="text"
                            name="groupId"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.groupId}
                            autoComplete="off"
                            onChange={handleChange} />
                        {!tokenGatingDetails.groupId && isError.configError && <Typography sx={{ color: 'red' }}>Group ID is required</Typography>}
                    </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <Box sx={{ width: 'calc(100% -16px)', marginBottom: '10px', marginRight: '16px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>Rule ID</Typography>
                        <TextField
                            placeholder="Enter Rule ID"
                            type="text"
                            name="ruleId"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.ruleId}
                            autoComplete="off"
                            onChange={handleChange} />
                    </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <Box sx={{ width: 'calc(100% -16px)', marginBottom: '10px' }}>
                        <Typography sx={{ marginBottom: '8px' }}>Collection Item ID
                            {isClaim &&
                                <Typography sx={{ color: 'red', display: 'inline-block', marginLeft: '4px' }}>*</Typography>
                            }
                        </Typography>
                        <TextField
                            required
                            placeholder="Enter Collection Item ID"
                            type="text"
                            disabled={!isClaim}
                            name="collectionItemId"
                            sx={{ width: '100%' }}
                            value={tokenGatingDetails?.collectionItemId}
                            autoComplete="off"
                            onChange={handleChange} />
                        {!tokenGatingDetails.collectionItemId && isError.configError && isClaim && <Typography sx={{ color: 'red' }}>Collection Item ID is required</Typography>}
                    </Box>
                </Grid>
            </Grid>
            <Button onClick={handleOpenModal} sx={{ margin: '16px 0', width: '100%' }}>Open Token Gating</Button>
            <Button onClick={getInvoice} disabled={!tokenGatingDetails?.invoiceId} sx={{ marginTop: '10px', width: '350px' }}>Get Invoice Details</Button>
            {showInvoice && tokenGatingDetails?.invoiceId && <Typography><pre>{
                JSON.stringify(tokenGatingDetails?.invoiceDetails ?? {}, null, 2)
            }</pre></Typography>}
        </Box>
    )
};

export default TokenGating;