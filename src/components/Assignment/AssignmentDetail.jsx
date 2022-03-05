import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import StudentSubmission from "../Submission/Student/StudentSubmission";
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";
import useCreateDateTime from "../../hooks/useCreateDateTime";
import { useAssignment } from "../../hooks/api/useAssignment";
import useUserRole from "../../hooks/api/useUserRole";


function AssignmentDetail() {
    const { code, assignment_id } = useParams()
    const { data: userRole } = useUserRole(code)
    const { data: assignment, isLoading } = useAssignment(code, assignment_id)
    const createdDateTime = useCreateEditDateTime(assignment?.created_at, assignment?.edited_at)
    const dueDateTime = useCreateDateTime(assignment?.due_date_time)


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            {assignment ?
                <>
                    <Card>
                        <CardContent>
                            <Box style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        color='primary'
                                    >
                                        {assignment.title}
                                    </Typography>

                                    <Typography variant="subtitle2">
                                        Posted at - {createdDateTime}
                                    </Typography>

                                    <Typography variant="subtitle2">
                                        Due date - {dueDateTime}
                                    </Typography>
                                </Box>

                                <Typography variant="subtitle2">
                                    {assignment.points} points
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <pre style={{ whiteSpace: 'pre-line', marginBottom: 0 }}>
                                <Typography variant="subtitle1">
                                    {assignment.text}
                                </Typography>
                            </pre>
                        </CardContent>
                    </Card>
                    {userRole === 'student' && <StudentSubmission totalPoints={assignment.points} />}
                </>
                :
                <h1>Loading...</h1>
            }
        </>
    )
}

export default AssignmentDetail
