import http from '../../http.js'
import { prop, } from 'ramda'

const getAllInvoicesTask = () => http.back4App.getTask({ url: `Classes/Invoices` }).map(prop('results'))

const findInvoicesByUserIdTask = (encodedId) => http.back4App.getTask({ url: `Classes/Invoices?${encodedId}` }).map(prop('results'))


export { getAllInvoicesTask, findInvoicesByUserIdTask }
