import { Box, Link, Stack, Typography } from "@mui/material"
import useUpcomingAssignment from "../../hooks/api/useUpcomingAssignment"
import useCreateDateTime from "../../hooks/useCreateDateTime"
import { Link as RouterLink } from 'react-router-dom';

function UpcomingAssignments({ code }) {
    const { data: assignments, isLoading } = useUpcomingAssignment(code)
    const assignment = assignments && assignments.length > 0 ? assignments[0] : null
    const dueDateTime = useCreateDateTime(assignment?.due_date_time)

    if (isLoading) {
        return (
            <Typography variant='subtitle2'>
                Loading...
            </Typography>
        )
    }

    //if there is no latest assignment
    if (!assignment) {
        return null
    }

    return (
        <Stack spacing={1}>
            <Typography
                variant="subtitle2"
                color={'text.secondary'}
            >
                Due {dueDateTime}
            </Typography>

            <Box sx={{ width: '80%' }}>
                <Link
                    underline="hover"
                    component={RouterLink}
                    to={`/${code}/assignments/${assignment.id}`}
                    color='inherit'
                    variant="subtitle1"
                    display='block'
                    noWrap
                >
                    {assignment.title}
                </Link>
            </Box>
        </Stack>
    )
}


export default UpcomingAssignments
