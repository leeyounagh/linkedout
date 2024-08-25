/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import reportTableData from 'components/Tables/data/reportTableData'
import Tables from 'components/Tables'
import Footer from 'examples/Footer'
import { Pagination, Box } from '@mui/material'
import { fetchData } from '../../api'

function Index() {
    const [data, setData] = useState({ columns: [], rows: [], totalPages: 0 })
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10
    const [sort] = useState('most')

    useEffect(() => {
        getReports(sort)
    }, [currentPage, sort])

    const getReports = async (sort) => {
        try {
            const options = {
                params: {
                    sort: sort,
                    page: currentPage,
                    limit: rowsPerPage,
                },
            }
            const response = await fetchData('/admin-task/reports', 'get', null, options)
            const { columns, rows } = reportTableData(response.data)
            setData({ columns, rows, totalPages: response.data.totalPage })
        } catch (err) {
            console.error('report list error', err)
        }
    }

    const handlePageChange = (_, value) => {
        setCurrentPage(value)
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Tables title="Reports List" columns={data.columns} rows={data.rows} />
            <Box display="flex" justifyContent="center" p={2}>
                <Pagination
                    count={data.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="secondary"
                    sx={{ color: 'white' }}
                />
            </Box>
            <Footer />
        </DashboardLayout>
    )
}

export default Index
