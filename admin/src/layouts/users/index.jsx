// 유저 관리 페이지
// TODO
// 콤보박스 : 공통 컴포넌트 -> 전체 목록/블랙 유저/구독 유저
// (페이지마다 모두 사용되지만, *뜨는 목록은 다름*)

/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import userTableData from 'components/Tables/data/userTableData'
import Tables from 'components/Tables'
import Footer from 'examples/Footer'
import { Pagination, Box } from '@mui/material'
import { fetchData } from '../../api'

function Index() {
    const [data, setData] = useState({ columns: [], rows: [], totalPages: 0 })
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10
    const [filter] = useState('all')

    useEffect(() => {
        getUsers(filter)
    }, [currentPage, filter])

    const getUsers = async (filter) => {
        try {
            const options = {
                params: {
                    page: currentPage,
                    limit: rowsPerPage,
                    filter: filter,
                },
            }
            const { data } = await fetchData('/admin-management/users', 'get', null, options)
            const { columns, rows } = userTableData(data)
            setData({ columns, rows, totalPages: data.totalPage })
        } catch (err) {
            console.error('user list error', err)
        }
    }

    const handlePageChange = (_, value) => {
        setCurrentPage(value)
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Tables title="User List" columns={data.columns} rows={data.rows} />
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
