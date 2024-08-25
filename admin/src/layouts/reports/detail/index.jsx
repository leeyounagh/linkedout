import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import BackgroudCard from 'components/BackgroundCard'
import Grid from '@mui/material/Grid'
import MDTypography from 'components/MDTypography'
import MDBox from 'components/MDBox'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchData } from '../../../api'
import EditModal from '../components/EditModal'
import { showToast } from '../../../utils/toast'
import { Button } from '@mui/material'
import reportListTableData from 'components/Tables/data/reportListTableData'
import DataTable from 'examples/Tables/DataTable'

export default function Index() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('id')
    const [data, setData] = useState({})
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [editModalOpen, setEditModalOpen] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            getDetail()
        }
    }, [id])

    const getDetail = async () => {
        try {
            const response = await fetchData(`/admin-task/reports/${id}`, 'get')
            const { columns, rows } = reportListTableData(response.data.reports)
            setColumns(columns)
            setRows(rows)
            setData(response.data)
        } catch (error) {
            console.error('Error fetching report detail', error)
        }
    }

    const editProfile = async () => {
        const { actionType, comment } = data.editedProfile
        const body = { actionType, comment }

        try {
            const editProfileResponse = await fetchData(`/admin-task/reports/${id}`, 'post', body)
            if (editProfileResponse.status === 200) {
                showToast.success('Report information updated successfully.')
                setData((prevData) => ({
                    ...prevData,
                    adminProfile: editProfileResponse.data,
                }))
                setEditModalOpen(false)
            }
        } catch (error) {
            showToast.error('Failed to update report information.')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prevData) => ({
            ...prevData,
            editedProfile: {
                ...prevData.editedProfile,
                [name]: value,
            },
        }))
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <EditModal
                open={editModalOpen}
                setOpen={setEditModalOpen}
                data={data.editedProfile || {}}
                setData={setData}
                onChange={handleChange}
                editProfile={editProfile}
            />
            <BackgroudCard
                btnTitle="List"
                link="/reports"
                optionalBtnTitle="Edit"
                optionalBtnLink="#"
                setEditModalOpen={setEditModalOpen}
            >
                <MDBox p={3}>
                    <MDTypography variant="h3">Report Detail</MDTypography>
                    <hr
                        style={{
                            marginTop: '10px',
                            borderTop: '1px solid lightgray',
                            marginBottom: '20px',
                            width: '100%',
                        }}
                    />
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={6} container alignItems="center">
                            <Grid item>
                                {data.thumbnail ? (
                                    <img
                                        src={data.thumbnail}
                                        alt="profile"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            marginBottom: '10px',
                                        }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: '1px solid',
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                        }}
                                    >
                                        No image
                                    </div>
                                )}
                            </Grid>
                            <Grid item style={{ marginLeft: '20px' }}>
                                <MDTypography variant="h5" color="secondary">
                                    Title
                                </MDTypography>
                                <MDTypography variant="body2">{data.title || '---'}</MDTypography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} container justifyContent="flex-end">
                            <Button
                                color="white"
                                onClick={() => navigate(`/user-detail?id=${data.authorId}`)}
                                style={{ fontSize: '20px', marginTop: '10px' }}
                            >
                                👉 User Info
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <MDTypography variant="h5" color="secondary">
                                Content
                            </MDTypography>
                            <MDBox
                                sx={{
                                    width: '100%',
                                    height: '150px',
                                    overflowY: 'auto',
                                    whiteSpace: 'pre-line',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                }}
                            >
                                <MDTypography variant="body2">{data.content || '---'}</MDTypography>
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MDTypography variant="h5" color="secondary">
                                LinkedOut Gauge
                            </MDTypography>
                            <MDTypography variant="body2">{data.linkedOutGauge || '---'}</MDTypography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MDTypography variant="h5" color="secondary">
                                Views
                            </MDTypography>
                            <MDTypography variant="body2">{data.views || 0}</MDTypography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MDTypography variant="h5" color="secondary">
                                Updated Date
                            </MDTypography>
                            <MDTypography variant="body2">{data.updatedDate || '---'}</MDTypography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MDTypography variant="h5" color="secondary">
                                Created Date
                            </MDTypography>
                            <MDTypography variant="body2">{data.createdDate || '---'}</MDTypography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MDTypography variant="h5" color="secondary">
                                Status
                            </MDTypography>
                            <MDTypography variant="body2">{data.status || '---'}</MDTypography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MDTypography variant="h5" color="secondary">
                                Device
                            </MDTypography>
                            <MDTypography variant="body2">{data.device || '---'}</MDTypography>
                        </Grid>
                    </Grid>
                    <MDBox mt={5}>
                        <MDTypography variant="h3">Report List</MDTypography>
                        <hr
                            style={{
                                marginTop: '10px',
                                borderTop: '1px solid lightgray',
                                marginBottom: '20px',
                                width: '100%',
                            }}
                        />
                        <MDBox mt={3} sx={{ overflowX: 'auto' }}>
                            <DataTable
                                table={{ columns, rows }}
                                isSorted={false}
                                entriesPerPage={false}
                                showTotalEntries={false}
                                noEndBorder
                            />
                        </MDBox>
                    </MDBox>
                </MDBox>
            </BackgroudCard>
            <Footer />
        </DashboardLayout>
    )
}
