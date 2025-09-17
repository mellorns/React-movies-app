export async function delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms))
}

export function formatDate(date='') {


    const arDate = date.split('-')

    const arMonth = ['Null', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return `${arDate[2]} ${arMonth[parseInt(arDate[1])]} ${arDate[0]}`

}