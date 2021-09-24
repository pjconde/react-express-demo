import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TaskListProps } from '../models/props.models';
import { appState } from '../models/state.models';
import { requestTaskCreation } from '../store/mutations';

export const TaskList = (props: TaskListProps) => (
    <div className="card p-2 m-2 col-6">
        <h3>{props.groupName}</h3>
        <div>
            {props.tasks.map(task => (
                <Link to={`/task/${task.id}`} key={task.id}>
                    <div className="card p-2 mt-2">{task.name}</div>
                </Link>
            ))}
        </div>
        <button 
            onClick={() => props.createNewTask(props.groupId)}
            className="btn btn-primary btn-block mt-2">
                Add new
        </button>
    </div>
)

function mapStateToProps(state: appState, ownProps: TaskListProps) {
    let groupId = ownProps.groupId;
    return {
        groupName: ownProps.groupName,
        groupId: ownProps.groupId,
        tasks: state.tasks.filter(task => task.group === groupId)
    }
}

function mapDistpatchToProps(dispatch: any, ownProps: TaskListProps) {
    return {
        createNewTask(id: string) {
            console.log("Creating new task...", id);
            dispatch(requestTaskCreation(id))
        }
    }
}

export const ConnectedTaskList = connect(mapStateToProps, mapDistpatchToProps) (TaskList);