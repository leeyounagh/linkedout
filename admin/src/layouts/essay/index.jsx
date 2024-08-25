/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import Tables from 'components/Tables'
import essayTableData from 'components/Tables/data/essayTableData'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import { Box, Pagination } from '@mui/material'
import { fetchData } from '../../api'

function index() {
    const [tableData, setTableData] = useState({ columns: [], rows: [] })
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10

    useEffect(() => {
        getEssay()
    }, [currentPage])

    const getEssay = async () => {
        try {
            const options = {
                params: {
                    page: currentPage,
                    limit: rowsPerPage,
                },
            }
            const { data } = await fetchData('/admin-management/essays', 'get', null, options)
            const { columns, rows } = essayTableData(data)
            setTableData({ columns, rows, totalPages: data.totalPage })
        } catch (err) {
            console.error('essay list error', err)
        }
    }

    const handlePageChange = (_, value) => {
        setCurrentPage(value)
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Tables title="Essay List" columns={tableData.columns} rows={tableData.rows} />
            <Box display="flex" justifyContent="center" p={2}>
                <Pagination
                    count={tableData.totalPages}
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

export default index
