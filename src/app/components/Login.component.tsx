import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";

const LoginComponent = ({authenticateUser, authenticated}: any) => (
    <div className="card p-3 col-6 mt-4">
        <h2>Please Login</h2>
        <form onSubmit={authenticateUser}>
            <input
                className="form-control"
                type="text"
                placeholder="Username"
                name="username"
                defaultValue="Dev">
            </input>
            <input 
                className="form-control mt-2"
                type="password"
                placeholder="password"
                name="password"
                defaultValue="">
            </input>
            {authenticated === mutations.NOT_AUTHENTICATED ? <p>Login incorrect</p> : null }
            <button type="submit" className="form-control mt-2 btn btn-primary">Login</button>
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