import React from 'react';
import { connect } from 'react-redux';
import { appState } from '../models/state.models';
import { DashboardProps } from '../models/props.models';
import { ConnectedTaskList } from './TaskList.component';

export const Dashboard = (props: DashboardProps) => (
    <div className="row">
        {props.groups.map(group => (
            <ConnectedTaskList 
                className="col"
                key={group.id}
                groupId={group.id}
                groupName={group.name}>
            </ConnectedTaskList>
        ))}
    </div>
)

function mapStateToProps(state: appState) {
    return {
        groups: state.groups
    }
}

export const ConnectedDashboard = connect(mapStateToProps) (Dashboard);