import styles from '../../../../../styles/QuickActionsToolBar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Tooltip } from '@mui/material'
import { memo } from 'react'

function QuickActionsToolbar({
    handleTaskEdit,
    boardId,
    groupedTasks,
    taskGroupId,
    taskId,
    setNewTaskOpen,
    level
}) {
    const handleEditClick = e => {
        e.stopPropagation()
        handleTaskEdit(e)
    }

    const handleSubtaskClick = e => {
        e.stopPropagation()
        setNewTaskOpen(true)
    }

    // const handleMoveTopClick = e => {
    //     e.stopPropagation()
    //     const taskGroup = groupedTasks
    //         ? groupedTasks.find(x => x._id === taskGroupId)
    //         : board.tasks
    //     const result = {
    //         destination: { droppableId: taskGroup._id },
    //         draggableId: taskId
    //     }
    //     const destinationIndex = taskGroup
    //     const sourceIndex = board.tasks.findIndex(
    //         x => x._id.toString() === taskId
    //     )
    //
    //     sortTask({
    //         result,
    //         destinationIndex,
    //         sourceIndex,
    //         boardId
    //     })
    // }
    //
    // const handleMoveBottomClick = e => {
    //     e.stopPropagation()
    //     const taskGroup = groupedTasks
    //         ? groupedTasks.find(x => x._id === taskGroupId)
    //         : board.tasks
    //     const result = {
    //         destination: { droppableId: taskGroup._id },
    //         draggableId: taskId
    //     }
    //     const destinationIndex = -1
    //     const sourceIndex = board.tasks.findIndex(
    //         x => x._id.toString() === taskId
    //     )
    //
    //     sortTask({
    //         result,
    //         destinationIndex,
    //         sourceIndex,
    //         boardId
    //     })
    // }

    return (
        <div className={styles.quickActionsToolbar}>
            {level <= 7 && (
                <Tooltip
                    disableInteractive
                    title="Create subtask"
                    placement="top"
                    arrow
                >
                    <div
                        className="quickActionItem text-[#7c828d]"
                        onClick={handleSubtaskClick}
                    >
                        <FontAwesomeIcon icon={solid('code-branch')} />
                    </div>
                </Tooltip>
            )}
            <Tooltip disableInteractive title="Rename" placement="top" arrow>
                <div
                    className="quickActionItem text-[#7c828d]"
                    onClick={handleEditClick}
                >
                    <FontAwesomeIcon icon={solid('pen')} />
                </div>
            </Tooltip>
            {/*<Tooltip disableInteractive title="Move up" placement="top" arrow>*/}
            {/*    <div*/}
            {/*        className="quickActionItem text-[#7c828d]"*/}
            {/*        onClick={handleMoveTopClick}*/}
            {/*    >*/}
            {/*        <FontAwesomeIcon icon={solid('arrow-up')} />*/}
            {/*    </div>*/}
            {/*</Tooltip>*/}
            {/*<Tooltip disableInteractive title="Move down" placement="top" arrow>*/}
            {/*    <div*/}
            {/*        className="quickActionItem text-[#7c828d]"*/}
            {/*        onClick={handleMoveBottomClick}*/}
            {/*    >*/}
            {/*        <FontAwesomeIcon icon={solid('arrow-down')} />*/}
            {/*    </div>*/}
            {/*</Tooltip>*/}
        </div>
    )
}

export default memo(QuickActionsToolbar)
