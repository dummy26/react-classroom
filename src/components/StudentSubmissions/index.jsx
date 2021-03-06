import { Divider, Grid, Stack, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import CenteredCircularProgress from "../shared/CenteredCircularProgress"
import useStudent from "../../hooks/api/useStudent"
import useStudentSubmissions from "../../hooks/api/useStudentSubmissions"
import StudentSubmissionCard from "./StudentSubmissionCard"
import NameAvatar from "../shared/NameAvatar";
import { useMemo, useState } from "react"
import SubmissionStatusSelect from "../shared/SubmissionStatusSelect"
import NotFound from "../shared/NotFound"


function StudentSubmissions() {
    const [selectedStatus, setSelectedStatus] = useState('All')
    const { code, studentId } = useParams()
    const { data: student, isLoading: isLoadingStudent, isError } = useStudent(code, studentId)
    const { data: submissions, isLoading: isLoadingSubmissions } = useStudentSubmissions(code, studentId)

    const filteredSubmissions = useMemo(() => {
        if (isLoadingSubmissions)
            return []

        if (selectedStatus === 'All')
            return submissions
        if (selectedStatus === 'Turned In')
            return submissions.filter(row => row.status === 'Done' || row.status === 'Submitted Late')

        return submissions.filter(submission => submission.status === selectedStatus)
    }, [submissions, selectedStatus])


    if (isError) {
        return (
            <NotFound
                msg='No such Student'
                redirectMsg={'Back to PeopleTab'}
                redirectLink={`/${code}/dashboard/people`}
            />
        )
    }

    if (isLoadingStudent || isLoadingSubmissions) {
        return <CenteredCircularProgress />
    }

    return (
        <Stack spacing={4}>
            <Stack direction='row' alignItems='center' spacing={4}>
                <NameAvatar size="large" name={student.name} />

                <Typography variant='h5'>
                    {student.name}
                </Typography>
            </Stack>

            <Divider />

            <Grid container>
                <Grid item xs={3}>
                    <SubmissionStatusSelect
                        value={selectedStatus}
                        onChange={(status) => setSelectedStatus(status)}
                    />
                </Grid>
            </Grid>

            <Stack spacing={2}>
                {filteredSubmissions.map(submission =>
                    <StudentSubmissionCard
                        key={submission.assignment.id}
                        submission={submission}
                    />
                )}
            </Stack>
        </Stack>
    )
}


export default StudentSubmissions
