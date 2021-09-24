import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TaskDetailProps } from "../models/props.models";
import { appState } from "../models/state.models";
import * as mutations from '../store/mutations'


const TaskDetail = (props: TaskDetailProps) => (
    <div className="card p-3 col-6 mt-4">
        <div className="form-group">
            <div>
                <input
                    onChange={props.setTaskName}
                    value={props.task.name}
                    className="form-control form-control-lg">
                </input>
            </div>
            <div className="mt-3">
                <button 
                    className="btn btn-primary mt-2"
                    onClick={() => props.setTaskCompletion(props.id, !props.isComplete)}>
                    {props.isComplete ? `Reopen` : `Complete`}
                </button>
            </div>
            <div className="mt-3">
                <select onChange={props.setTaskGroup} value={props.task.group} className="form-control">
                    {props.groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
            </div>
            <div className="mt-3"> 
                <Link to="/dashboard">
                    <button className="btn btn-primary mt-2">Done</button>
                </Link> 
            </div>
        </div>
    </div>
);

function mapStateToProps(state: appState, ownProps: any) {
    let id = ownProps.match.params.id;
    let task = state.tasks.find(task => task.id === id);
    let groups = state.groups;
    let temp = {
        name: "Meh",
        id: "123",
        group: "G1",
        owner: "U1",
        isComplete: false
    }

    return {
        id,
        task: !!task ? task : temp,
        groups,
        isComplete: !!task ? task.isComplete : false
    }
}

function mapDistpatchToProps(dispatch: any, ownProps:any) {
    const id = ownProps.match.params.id;
    return {
        setTaskCompletion(id: string, isComplete: boolean) {
            dispatch(mutations.setTaskCompletion(id, isComplete))
        },
        setTaskGroup(e: React.ChangeEvent<HTMLSelectElement>) {
            dispatch(mutations.setTaskGroup(id, e.target.value))
        },
        setTaskName(e: React.ChangeEvent<HTMLInputElement>) {
            dispatch(mutations.setTaskName(id, e.target.value))
        }
    }
}

export const ConnectedTaskDetail = connect(mapStateToProps, mapDistpatchToProps) (TaskDetail);