import React from 'react';
import { MsalProvider, MsalConsumer, useMsal, useIsAuthenticated, AuthenticatedTemplate, UnauthenticatedTemplate } from '../src';

import { msalInstance } from './msalInstance';

export default {
    title: 'MSAL React/Login & Logout',
};

export const LoginPopup = () => (
    <MsalProvider instance={msalInstance}>
        <PopupExample />
    </MsalProvider>
);

export const Logout = () => (
    <MsalProvider instance={msalInstance}>
        <UnauthenticatedTemplate>
            <p>You must be logged in to be able to logout.</p>
        </UnauthenticatedTemplate>
        <LogoutExample />
    </MsalProvider>
);


const PopupExample = () => {
    const { instance, state } = useMsal();

    const accounts = state.accounts;

    return (
        <React.Fragment>
            <AuthenticatedTemplate>
                <p>Accounts: {accounts.map(a => a.username).join(', ')}</p>
                <button onClick={() => instance.logout()}>Logout</button>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <button onClick={() => instance.loginPopup({ scopes: [] })}>Login</button>
            </UnauthenticatedTemplate>
        </React.Fragment>
    );
};


const LogoutExample = () => {
    const { instance, state } = useMsal();
    
    const accounts = state.accounts;

    return (
        <React.Fragment>
            {accounts.map((account) => (
                <React.Fragment key={account.homeAccountId}>
                    <span>{account.username}</span>
                    <button onClick={() => instance.logout({ account })} style={{ marginLeft: 20 }}>Logout</button>
                </React.Fragment>
            ))}
        </React.Fragment>
    );
};