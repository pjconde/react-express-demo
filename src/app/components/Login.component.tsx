import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";

const LoginComponent = ({authenticateUser, authenticated}: any) => (
    <div>
        <h2>Please Login</h2>
        <form onSubmit={authenticateUser}>
            <input type="text" placeholder="Username" name="username" defaultValue="Dev"></input>
            <input type="password" placeholder="password" name="password" defaultValue=""></input>
            {authenticated === mutations.NOT_AUTHENTICATED ? <p>Login incorrect</p> : null }
            <button type="submit">Login</button>
        </form>
    </div>
)

const mapStateToProps = ({session}: any) => ({
    authenticated: session.authenticated
});

function mapDistpatchToProps(dispatch: any) {
    return {
        // React.FormEvent<HTMLFormElement>
        authenticateUser(e: any) {
            e.preventDefault();
            const username: string = e.target['username'].value;
            const password: string = e.target['password'].value;
            dispatch(mutations.requestAuthUser(username, password));
        }
    }
}

export const ConnectedLogin = connect(mapStateToProps, mapDistpatchToProps) (LoginComponent)