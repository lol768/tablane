import {Component} from 'react'
import './assets/Board.css'
import TaskGroup from './partials/TaskGroup'
import {connect} from "react-redux";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    TextField
} from "@material-ui/core";
import axios from "axios";
import {toast} from "react-hot-toast";
import Button from "@material-ui/core/Button";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', loading: false, dialogOpen: false}
    }


    findBoardId = () => {
        const space = this.props.match.params.space.replace('-', ' ')
        const board = this.props.match.params.board.replace('-', ' ')
        return this.props.workspaces.spaces.find(x => x.name === space).boards.find(x => x.name === board)._id
    }

    getData = async () => {
        this.setState({loading: true})
        await axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:3001/api/board/${this.findBoardId()}`
        }).then(res => {
            this.props.dispatch({type: 'setData', payload: ['board', res.data]})
        }).catch(err => {
            toast(err.toString())
        })
        this.setState({loading: false})
    }

    handleNewTaskGroup = async () => {
        this.setState({dialogOpen: false})
        await axios({
            method: 'POST',
            withCredentials: true,
            data: {
                name: this.state.name
            },
            url: `http://localhost:3001/api/taskgroup/${this.findBoardId()}`
        }).then(res => {
            this.getData()
        }).catch(err => {
            toast(err.toString())
        })
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.url === this.props.match.url) return
        this.getData()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                {!this.props.board
                    ? <LinearProgress/>
                    : <div>
                        {this.state.loading ? <LinearProgress/> : <div className="loading-placeholder"> </div>}
                        <div className="task-group">
                            {this.props.board.taskGroups.map(taskGroup => {
                                return <TaskGroup
                                    getData={this.getData}
                                    boardId={this.props.board._id}
                                    key={taskGroup.name}
                                    taskGroup={taskGroup}
                                    attributes={this.props.board.attributes}/>
                            })}
                        </div>
                        <div className="add-task-group">
                            <div> </div>
                            <button onClick={() => this.setState({dialogOpen: true})}>ADD NEW TASKGROUP</button>
                            <div> </div>
                        </div>
                    </div>
                }
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={() => this.setState({dialogOpen: false})}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}>
                    <DialogTitle id="form-dialog-title">Add new TaskGroup</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            onChange={this.handleChange}
                            label="TaskGroup Name"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({dialogOpen: false})} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleNewTaskGroup} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
        workspaces: state.workspaces,
        board: state.board
    }
)

export default connect(mapStateToProps)(Board)