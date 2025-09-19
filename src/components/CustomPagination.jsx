import Pagination from 'react-bootstrap/Pagination';

export default function CustomPagination({ total, page, onPageChange }) {


    // const PagesList = (currentPage, totalPages) => {
    //     const range = []
    //     for (let i = 1; i <= totalPages; i++) {
    //         if (i == 1 || i == totalPages || i >= currentPage - 2 && i <= currentPage + 2) {
    //             range.push(i)
    //         }
    //     }
    //     let prevPage
    //     const filteredRange = []
    //     range.forEach(page => {
    //         if (page === 1) {
    //             prevPage = page
    //             filteredRange.push(page)
    //             return
    //         }
    //         if (page - prevPage === 2) {
    //             filteredRange.push(prevPage + 1)
    //         } else if (page - prevPage !== 1) {
    //             filteredRange.push('...')
    //         }
    //         prevPage = page
    //         filteredRange.push(page)
    //     })
    //     const pagin = filteredRange.map((num, index) => {
    //         if (typeof (num) === 'number') {
    //             return <Pagination.Item key={index} active={num === page} onClick={() => onPageChange(num)}>
    //                 {num}
    //             </Pagination.Item>
    //         } else {
    //             return <Pagination.Item key={index} disabled={true}>
    //                 {num}
    //             </Pagination.Item>
    //         }
    //     })
    //     return pagin
    // }

    const PagesList = (currentPage, totalPages) => {

        const rangeArray = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]

        const filteredRange = rangeArray.filter(p => p > 1 && p < totalPages)

        if (currentPage < totalPages - 4) filteredRange.push('...')

        if (currentPage === totalPages - 4) filteredRange.push(totalPages - 1)

        if (currentPage === 5) filteredRange.unshift(2)

        if (currentPage > 5) filteredRange.unshift('...')


        const finalRange = [1, ...filteredRange, total]

        const pagin = finalRange.map((num, index) => {
            if (typeof (num) === 'number') {
                return <Pagination.Item key={index} active={num === page} onClick={() => onPageChange(num)}>
                    {num}
                </Pagination.Item>
            } else {
                return <Pagination.Item key={index} disabled={true}>
                    {num}
                </Pagination.Item>
            }
        })
        return pagin
    }

    if (total === 0) return null


    return (
        <Pagination>
            {page !== 1 && <>
                <Pagination.First onClick={() => onPageChange(1)} />
                <Pagination.Prev onClick={() => onPageChange(page - 1)} />
            </>}
            {PagesList(page, total)}
            {page !== total && <>
                <Pagination.Next onClick={() => onPageChange(page + 1)} />
                <Pagination.Last onClick={() => onPageChange(total)} />
            </>}

        </Pagination>
    );
}